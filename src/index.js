export default {
  async scheduled(event, env, ctx) {
    // Scheduled events are triggered by cron.
    // You can use ctx.waitUntil if you want to let work continue after the handler returns.

    ctx.waitUntil(callExternalApi());
  },

  // Optional: allow manual testing via HTTP
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Send a POST request to trigger the API call.", { status: 405 });
    }
    ctx.waitUntil(callExternalApi());
    return new Response("Triggered API call.", { status: 200 });
  }
};

async function callExternalApi() {
  const url = "https://wedding-backend-ik3r.onrender.com/api/health"; // set in wrangler secrets or via env

  if (!url) {
    console.error("Missing env.API_URL");
    return;
  }

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  const text = await resp.text();

  if (!resp.ok) {
    console.error(`API call failed: ${resp.status} ${resp.statusText}`, text);
    return;
  }

  console.log("API call success:", resp.status, text);
}