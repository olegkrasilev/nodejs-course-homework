async function getResponse(url, params, headers, method, body) {
  try {
    const response = await fetch("/proxy-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...url,
        params,
        headers,
        ...method,
        body,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {}
}
