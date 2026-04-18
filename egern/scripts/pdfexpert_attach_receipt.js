const ACTIVE_STATE = {
  entitlements: [
    "ios.pe.subscription.pdf-features",
    "ios.pe.ai-features",
  ],
  type: "subscription",
  productId: "com.readdle.PDFExpert5.subscription.yearly",
  state: "active",
  expirationDate: "09:00 01/01/2099",
  expirationTimestamp: 4070908800,
};

function ensureIosProduct(body) {
  if (!Array.isArray(body.linkedProducts)) {
    body.linkedProducts = [];
  }
  let product = body.linkedProducts.find(
    (item) => item && item.bundleId === "com.readdle.PDFExpert5",
  );
  if (!product) {
    product = {
      bundleId: "com.readdle.PDFExpert5",
      chargingPlatform: "iOS AppStore",
      receiptId: Date.now(),
      inAppStates: [],
      statisticsInfo: { events: [] },
    };
    body.linkedProducts.unshift(product);
  }
  if (!Array.isArray(product.inAppStates)) {
    product.inAppStates = [];
  }
  product.inAppStates = [ACTIVE_STATE];
  if (!product.statisticsInfo || typeof product.statisticsInfo !== "object") {
    product.statisticsInfo = { events: [] };
  }
  if (!Array.isArray(product.statisticsInfo.events)) {
    product.statisticsInfo.events = [];
  }
}

export default async function(ctx) {
  const body = await ctx.response.json();
  body.newAccount = false;
  body.blockedEntitlements = [];
  ensureIosProduct(body);
  return { body };
}
