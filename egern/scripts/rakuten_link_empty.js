export default async function(ctx) {
  return ctx.respond({
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: "",
  });
}
