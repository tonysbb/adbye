export default async function(ctx) {
  const body = await ctx.response.json();
  body.errorType = null;
  body.error = false;
  if (!body.response || typeof body.response !== "object") {
    body.response = {};
  }
  return { body };
}
