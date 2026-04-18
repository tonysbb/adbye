function shorten(text, limit = 800) {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default async function(ctx) {
  let body = "";
  try {
    const json = await ctx.response.json();
    body = JSON.stringify(json);
  } catch (_) {
    try {
      body = await ctx.response.text();
    } catch (_) {}
  }
  const now = Date.now();
  const key = `pdfexpert:license:resp:${ctx.response.status}:${ctx.request.url}`;
  const last = Number(ctx.storage.get(key) || "0");
  if (now - last < 10000) {
    return {};
  }
  ctx.storage.set(key, String(now));
  ctx.notify({
    title: "PDF License 响应",
    subtitle: String(ctx.response.status),
    body: shorten(`${ctx.request.url}\n${body}`),
    sound: false,
    duration: 10,
  });
  return {};
}
