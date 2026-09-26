export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: "All fields are required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        await env.DB.prepare(
          "INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, datetime('now'))"
        )
          .bind(name, email, message)
          .run();

        return new Response(JSON.stringify({ status: "ok" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Something went wrong." }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
