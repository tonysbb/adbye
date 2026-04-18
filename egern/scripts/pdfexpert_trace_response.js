function shouldTrack(url) {
  return /(license|entitlement|premium|pro|subscription|receipt|usage|auth|account|product|plan|purchase|restore|access)/i.test(url);
}

function shorten(text, limit = 320) {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default async function(ctx) {
  const url = ctx.request.url;
  if (!shouldTrack(url)) {
    return {};
  }
  let payload = "";
  try {
    payload = JSON.stringify(await ctx.response.json());
  } catch (_) {
    try {
      payload = await ctx.response.text();
    } catch (_) {}
  }
  const now = Date.now();
  const key = `pdfexpert:trace:resp:${ctx.response.status}:${url}`;
  const last = Number(ctx.storage.get(key) || "0");
  if (now - last < 8000) {
    return {};
  }
  ctx.storage.set(key, String(now));
  ctx.notify({
    title: "PDF Trace 响应",
    subtitle: String(ctx.response.status),
    body: shorten(`${url}\n${payload}`),
    sound: false,
    duration: 8,
  });
  return {};
}
