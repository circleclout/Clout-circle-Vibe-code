"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import services from "@/content/services";
import siteConfig from "@/content/siteConfig";
import styles from "./QuoteForm.module.css";

export function openQuoteModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-quote"));
  }
}

export default function QuoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState("idle"); // idle, submitting, success, error

  const [formData, setFormData] = useState({
    selectedServices: [],
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    phone: "",
    honeypot: "",
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-quote", handleOpen);
    return () => window.removeEventListener("open-quote", handleOpen);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeForm = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setFormState("idle");
    }, 300); // Wait for transition
  };

  const handleServiceToggle = (serviceTitle) => {
    setFormData((prev) => {
      const current = prev.selectedServices;
      const updated = current.includes(serviceTitle)
        ? current.filter((s) => s !== serviceTitle)
        : [...current, serviceTitle];
      return { ...prev, selectedServices: updated };
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) return;

    setFormState("submitting");

    try {
      const res = await fetch(
        `https://formspree.io/f/${siteConfig.formspreeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
            services: formData.selectedServices.join(", "),
            budget: formData.budget,
            timeline: formData.timeline,
            type: "Quote Request",
          }),
        }
      );

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (!isOpen && formState === "idle" && step === 1) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={closeForm}
          aria-label="Close quote form"
        >
          <X size={24} />
        </button>

        {formState === "success" ? (
          <div className={styles.successState}>
            <CheckCircle size={64} className={styles.successIcon} />
            <h2>Quote Request Sent!</h2>
            <p>
              Thanks, {formData.name}. Our team will review your requirements
              and get back to you within 24 hours to discuss the next steps.
            </p>
            <button className={styles.btnPrimary} onClick={closeForm}>
              Done
            </button>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>Get a Custom Quote</h2>
              <div className={styles.progress}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
              <p className={styles.stepText}>Step {step} of 3</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* STEP 1: Services */}
              <div className={`${styles.step} ${step === 1 ? styles.active : ""}`}>
                <h3>What services do you need?</h3>
                <p className={styles.subtitle}>Select all that apply.</p>
                <div className={styles.serviceGrid}>
                  {services.map((service) => {
                    const isSelected = formData.selectedServices.includes(
                      service.title
                    );
                    return (
                      <button
                        key={service.id}
                        type="button"
                        className={`${styles.serviceCard} ${
                          isSelected ? styles.serviceSelected : ""
                        }`}
                        onClick={() => handleServiceToggle(service.title)}
                      >
                        <div
                          className={styles.checkbox}
                          data-checked={isSelected}
                        >
                          {isSelected && <CheckCircle size={14} />}
                        </div>
                        {service.title}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    className={`${styles.serviceCard} ${
                      formData.selectedServices.includes("Not sure")
                        ? styles.serviceSelected
                        : ""
                    }`}
                    onClick={() => handleServiceToggle("Not sure")}
                  >
                    <div
                      className={styles.checkbox}
                      data-checked={formData.selectedServices.includes(
                        "Not sure"
                      )}
                    >
                      {formData.selectedServices.includes("Not sure") && (
                        <CheckCircle size={14} />
                      )}
                    </div>
                    Not sure yet
                  </button>
                </div>
              </div>

              {/* STEP 2: Budget & Timeline */}
              <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>
                <h3>Budget & Timeline</h3>
                <p className={styles.subtitle}>Help us set expectations.</p>

                <div className={styles.field}>
                  <label className={styles.label}>Estimated Budget</label>
                  <div className={styles.radioGroup}>
                    {[
                      "Under ₹25K",
                      "₹25K - ₹50K",
                      "₹50K - ₹1L",
                      "₹1L - ₹3L",
                      "₹3L+",
                    ].map((val) => (
                      <label key={val} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="budget"
                          value={val}
                          checked={formData.budget === val}
                          onChange={handleChange}
                          className={styles.radio}
                        />
                        <span>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Expected Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Select a timeline</option>
                    <option value="ASAP">ASAP (within 1-2 weeks)</option>
                    <option value="1 month">Within 1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* STEP 3: Contact Info */}
              <div className={`${styles.step} ${step === 3 ? styles.active : ""}`}>
                <h3>Your Details</h3>
                <p className={styles.subtitle}>Where should we send the quote?</p>

                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label className={styles.label}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      required={step === 3}
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label className={styles.label}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required={step === 3}
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="hp-field" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleChange}
                  />
                </div>

                {formState === "error" && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={18} />
                    Failed to send request. Please try again.
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className={styles.navigation}>
                {step > 1 ? (
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={prevStep}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <div /> /* Empty div for flex spacing */
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={nextStep}
                    disabled={
                      step === 1 && formData.selectedServices.length === 0
                    }
                  >
                    Next <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={styles.btnPrimary}
                    disabled={formState === "submitting"}
                  >
                    {formState === "submitting" ? "Sending..." : "Submit Request"}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
