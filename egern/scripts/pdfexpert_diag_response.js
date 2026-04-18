function shorten(text, limit = 180) {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default async function(ctx) {
  const url = ctx.request.url;
  const status = ctx.response.status;
  const contentType = ctx.response.headers.get("content-type") || "";
  let payload = "";
  try {
    const json = await ctx.response.json();
    payload = JSON.stringify(json);
  } catch (_) {
    try {
      payload = await ctx.response.text();
    } catch (_) {}
  }
  const now = Date.now();
  const key = `pdfexpert:resp:${status}:${url}`;
  const last = Number(ctx.storage.get(key) || "0");
  if (now - last < 15000) {
    return {};
  }
  ctx.storage.set(key, String(now));
  ctx.notify({
    title: "PDF Expert 响应",
    subtitle: String(status),
    body: shorten(`${url}\n${contentType}\n${payload}`, 280),
    sound: false,
    duration: 8,
  });
  return {};
}
