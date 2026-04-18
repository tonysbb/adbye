function shorten(text, limit = 800) {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default async function(ctx) {
  let body = "";
  try {
    const json = await ctx.request.json();
    body = JSON.stringify(json);
  } catch (_) {
    try {
      body = await ctx.request.text();
    } catch (_) {}
  }
  const now = Date.now();
  const key = `pdfexpert:refresh:req:${ctx.request.url}`;
  const last = Number(ctx.storage.get(key) || "0");
  if (now - last < 10000) {
    return {};
  }
  ctx.storage.set(key, String(now));
  ctx.notify({
    title: "PDF Refresh 请求",
    subtitle: ctx.request.method,
    body: shorten(body || ctx.request.url),
    sound: false,
    duration: 10,
  });
  return {};
}
