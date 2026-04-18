const PREMIUM_META = {
  isPremium: true,
  hasPremium: true,
  hasAccess: true,
  subscriptionState: "active",
  subscriptionPlan: "pro",
  subscriptionExpirationDate: "09:00 01/01/2099",
  entitlements: [
    "ios.pe.subscription.pdf-features",
    "ios.pe.ai-features",
  ],
};

export default async function(ctx) {
  const body = await ctx.response.json();
  if (!body.auth || typeof body.auth !== "object") {
    body.auth = {};
  }
  body.auth.errorType = null;
  body.auth.error = false;
  if (!body.auth.response || typeof body.auth.response !== "object") {
    body.auth.response = {};
  }
  Object.assign(body.auth.response, PREMIUM_META);
  return { body };
}
