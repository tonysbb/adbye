export default async function(ctx) {
  const headers = new Headers(ctx.request.headers);
  headers.delete("If-None-Match");
  headers.delete("if-none-match");
  return { headers };
}
