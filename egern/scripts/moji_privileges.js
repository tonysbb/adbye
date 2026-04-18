const UNLOCKED_PRIVILEGE = {
  identity: "000-002-00001",
  privilegeStatus: "activated",
  privilege: {
    status: "cancel",
    payType: "4",
    expiresDate: 4092599349000,
    purchaseDate: 1666666666666,
  },
  canPay: true,
};

export default async function(ctx) {
  const body = await ctx.response.json();
  if (!body.result || !Array.isArray(body.result)) {
    body.result = [];
  }
  while (body.result.length < 3) {
    body.result.push({});
  }
  body.result[2] = UNLOCKED_PRIVILEGE;
  return { body };
}
