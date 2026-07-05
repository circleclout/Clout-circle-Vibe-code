"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import siteConfig from "@/content/siteConfig";
import services from "@/content/services";
import styles from "./page.module.css";

export default function ContactClient({ dbSettings }) {
  const [formState, setFormState] = useState("idle"); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    honeypot: "", // anti-bot
  });

  const email = dbSettings?.contactEmail || siteConfig.email;
  const phone = dbSettings?.contactPhone || siteConfig.phone;
  const address = dbSettings?.contactAddress || siteConfig.address;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

    setFormState("sending");

    try {
      // Using Formspree — replace with your ID in siteConfig
      const res = await fetch(
        `https://formspree.io/f/${siteConfig.formspreeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            service: formData.service,
            budget: formData.budget,
            message: formData.message,
          }),
        }
      );

      if (res.ok) {
        setFormState("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
          honeypot: "",
        });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              label="Contact Us"
              title="Let's Build Something Great"
              description="Got a project in mind? Need a strategy partner? Just want to chat? We're all ears."
            />
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={`${styles.contactGrid} container`}>
          {/* Form */}
          <ScrollReveal direction="left" className={styles.formSide}>
            <h3 className={styles.formTitle}>Send Us a Message</h3>

            {formState === "success" ? (
              <div className={styles.successMessage}>
                <CheckCircle size={40} />
                <h4>Message Sent!</h4>
                <p>
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => setFormState("idle")}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Your name"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="company" className={styles.label}>
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="service" className={styles.label}>
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Not sure">Not sure — need guidance</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="budget" className={styles.label}>
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select budget range</option>
                      <option value="Under ₹25K">Under ₹25K</option>
                      <option value="₹25K - ₹50K">₹25K – ₹50K</option>
                      <option value="₹50K - ₹1L">₹50K – ₹1L</option>
                      <option value="₹1L - ₹3L">₹1L – ₹3L</option>
                      <option value="₹3L+">₹3L+</option>
                      <option value="Let's discuss">Let&apos;s discuss</option>
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                {/* Honeypot */}
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
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={formState === "sending"}
                >
                  {formState === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right" className={styles.infoSide}>
            <h3 className={styles.infoTitle}>Or Reach Out Directly</h3>

            <div className={styles.infoCards}>
              <a
                href={`mailto:${email}`}
                className={styles.infoCard}
              >
                <Mail size={20} className={styles.infoIcon} />
                <div>
                  <p className={styles.infoLabel}>Email Us</p>
                  <p className={styles.infoValue}>{email}</p>
                </div>
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={styles.infoCard}
              >
                <Phone size={20} className={styles.infoIcon} />
                <div>
                  <p className={styles.infoLabel}>Call Us</p>
                  <p className={styles.infoValue}>{phone}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.infoCard} ${styles.whatsappCard}`}
              >
                <div className={styles.whatsappIcon}>💬</div>
                <div>
                  <p className={styles.infoLabel}>WhatsApp</p>
                  <p className={styles.infoValue}>Chat with us instantly</p>
                </div>
                <ArrowUpRight size={16} className={styles.arrowIcon} />
              </a>


            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
