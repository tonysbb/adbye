export default async function(ctx) {
  return ctx.respond({
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
    body: "",
  });
}
