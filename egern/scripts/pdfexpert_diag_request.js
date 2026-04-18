function shorten(text, limit = 180) {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default async function(ctx) {
  const now = Date.now();
  const key = `pdfexpert:req:${ctx.request.method}:${ctx.request.url}`;
  const last = Number(ctx.storage.get(key) || "0");
  if (now - last < 15000) {
    return {};
  }
  ctx.storage.set(key, String(now));
  ctx.notify({
    title: "PDF Expert 请求",
    subtitle: ctx.request.method,
    body: shorten(ctx.request.url),
    sound: false,
    duration: 8,
  });
  return {};
}
