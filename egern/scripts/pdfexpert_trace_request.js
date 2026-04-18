function shouldTrack(url) {
  return /(license|entitlement|premium|pro|subscription|receipt|usage|auth|account|product|plan|purchase|restore|access)/i.test(url);
}

function shorten(text, limit = 220) {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default async function(ctx) {
  const url = ctx.request.url;
  if (!shouldTrack(url)) {
    return {};
  }
  const now = Date.now();
  const key = `pdfexpert:trace:req:${ctx.request.method}:${url}`;
  const last = Number(ctx.storage.get(key) || "0");
  if (now - last < 8000) {
    return {};
  }
  ctx.storage.set(key, String(now));
  ctx.notify({
    title: "PDF Trace 请求",
    subtitle: ctx.request.method,
    body: shorten(url),
    sound: false,
    duration: 8,
  });
  return {};
}
