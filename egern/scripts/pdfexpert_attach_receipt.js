const UNLOCKED_SUBSCRIPTION = {
  subscriptionState: "active",
  subscriptionExpirationDate: "09:00 01/01/2099",
  subscriptionPlan: "pro",
  isEligibleForWinBackOffer: false,
};

export default async function(ctx) {
  return ctx.respond({
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(UNLOCKED_SUBSCRIPTION),
  });
}
