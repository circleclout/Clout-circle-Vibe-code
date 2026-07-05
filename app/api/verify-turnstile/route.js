export async function POST(req) {
  try {
    const body = await req.json();
    const { token, name, email, feedback } = body;

    // Verify the Turnstile token with Cloudflare
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return Response.json(
        { error: "Bot check failed. Please try again." },
        { status: 400 }
      );
    }

    // Token is valid — now forward to Formspree
    const formspreeRes = await fetch(
      `https://formspree.io/f/${process.env.FORMSPREE_ID || "mgojkwgl"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, feedback, type: "Website Feedback" }),
      }
    );

    if (!formspreeRes.ok) {
      return Response.json({ error: "Failed to send feedback." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
