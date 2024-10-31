function renderResponse({ body, code, headers }) {
  let formattedBody;
  if (typeof body === "string" && body.trim().startsWith("<")) {
    formattedBody = `<pre>${body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre>`;
  } else if (typeof body === "object") {
    formattedBody = `<pre><code>${JSON.stringify(body, null, 2)}</code></pre>`;
  } else {
    formattedBody = `<pre>${String(body).replace(/\n/g, "<br>")}</pre>`;
  }

  const html = `
    <h1>Code:</h1>
    <p>${code}</p>
    <div>
      <h1>Body:</h1>
      ${formattedBody}
    </div>
    <div>
      <h1>Headers:</h1>
      <pre><code>${JSON.stringify(headers, null, 2)}</code></pre>
    </div>
  `;

  const container = document.getElementById("responseContainer");
  if (container) {
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", html);
  }
}
