const PREMIUM_EXPIRATION = 3745855150;

export default async function(ctx) {
  const body = await ctx.response.json();
  body.tier = "plus";
  body.free_trial_eligible = false;
  body.is_premium = true;
  body.free_trial = true;
  body.expiration = PREMIUM_EXPIRATION;
  body.next_charge = PREMIUM_EXPIRATION;
  body.name = "彭于晏解锁";
  return { body };
}
