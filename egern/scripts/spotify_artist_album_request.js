export default async function(ctx) {
  let url = ctx.request.url;
  if (url.includes("com:443")) {
    url = url.replace(/com:443/, "com");
  }
  if (url.includes("platform=iphone")) {
    url = url.replace(/platform=iphone/, "platform=ipad");
  }
  if (url === ctx.request.url) {
    return {};
  }
  return { url };
}
