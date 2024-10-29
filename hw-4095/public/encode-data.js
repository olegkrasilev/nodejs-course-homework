function encodeData(data) {
  return Object.keys(data)
    .map(function (key) {
      if (key.length === 0) {
        return;
      }
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
}
