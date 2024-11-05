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

    if (!response.ok && (response.status < 300 || response.status > 399)) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const contentType = data.headers["content-type"];
    if (contentType && contentType.startsWith("image/")) {
      data.body = `<img src="${url?.url}"/>`;
      return data;
    }

    return data;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}
