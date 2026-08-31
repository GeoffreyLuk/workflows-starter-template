export default {
  async scheduled(event, env, ctx) {
    const backendUrl = "https://wedding-backend-ik3r.onrender.com/api/health";
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    // Use ctx.waitUntil to ensure the request completes if the worker exits early
    ctx.waitUntil(
      fetch(backendUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            console.error(`Backend responded with status: ${response.status}`);
          }
        })
        .catch(error => console.error("API Call Failed:", error))
    );
  },
};
