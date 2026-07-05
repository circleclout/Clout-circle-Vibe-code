"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import styles from "./FeedbackForm.module.css";

// Your Cloudflare Turnstile site key (public — safe to expose)
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"; // replace with your key

export default function FeedbackForm() {
  const [formState, setFormState] = useState("idle"); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    honeypot: "",
  });
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    // Load the Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          callback: (token) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(null),
          "error-callback": () => setTurnstileToken(null),
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

    if (!turnstileToken) {
      setErrorMsg("Please complete the bot check first.");
      return;
    }

    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: turnstileToken,
          name: formData.name,
          email: formData.email,
          feedback: formData.feedback,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormState("success");
      } else {
        setErrorMsg(data.error || "Failed to send. Please try again.");
        setFormState("error");
        // Reset the Turnstile widget on failure
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken(null);
        }
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
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

        {/* Honeypot field for dumb bots */}
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

        {/* Cloudflare Turnstile widget */}
        <div ref={turnstileRef} className={styles.turnstile} />

        {(formState === "error" || errorMsg) && (
          <div className={styles.errorMessage}>
            <AlertCircle size={18} />
            {errorMsg || "Failed to send feedback. Please try again."}
          </div>
        )}

        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={formState === "submitting" || !turnstileToken}
        >
          {formState === "submitting" ? "Sending..." : (
            <>Submit Feedback <Send size={16} /></>
          )}
        </button>
      </form>
    </div>
  );
}
