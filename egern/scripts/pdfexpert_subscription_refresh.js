const UNLOCKED_SUBSCRIPTION = {
  subscriptionState: "active",
  subscriptionExpirationDate: "09:00 01/01/2099",
  subscriptionPlan: "pro",
  isEligibleForWinBackOffer: false,
};

export default async function(ctx) {
  try {
    await ctx.response.json();
  } catch (_) {
    // Ignore invalid body and return the forged subscription payload directly.
  }
  return { body: UNLOCKED_SUBSCRIPTION };
}
