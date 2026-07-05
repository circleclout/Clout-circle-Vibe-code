"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import siteConfig from "@/content/siteConfig";
import styles from "./FeedbackForm.module.css";

export default function FeedbackForm() {
  const [formState, setFormState] = useState("idle"); // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    honeypot: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) return; // Basic spam prevention

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
            feedback: formData.feedback,
            type: "Website Feedback",
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

  if (formState === "success") {
    return (
      <div className={styles.feedbackContainer}>
        <div className={styles.successMessage}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h3 className={styles.title}>Thank You!</h3>
          <p className={styles.subtitle}>
            We appreciate your feedback. It helps us improve and serve you better!
          </p>
          <button
            className={styles.btnPrimary}
            onClick={() => setFormState("idle")}
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedbackContainer}>
      <h3 className={styles.title}>Have Feedback?</h3>
      <p className={styles.subtitle}>
        We are always looking for ways to improve our site and our services. Let us know what you think!
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Name (Optional)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="John Doe"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email (Optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="john@example.com"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Feedback *</label>
          <textarea
            name="feedback"
            required
            value={formData.feedback}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Tell us what you think..."
          />
        </div>

        {/* Honeypot field for spam bots */}
        <div style={{ display: "none" }} aria-hidden="true">
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
            Failed to send feedback. Please try again.
          </div>
        )}

        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={formState === "submitting"}
        >
          {formState === "submitting" ? "Sending..." : <><span>Submit Feedback</span> <Send size={16} /></>}
        </button>
      </form>
    </div>
  );
}
