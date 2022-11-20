import { Shopify, LATEST_API_VERSION } from '@shopify/shopify-api';

// Only for development. Won't work when used a serverless function.
const dbFile = join(process.cwd(), 'database.sqlite');
const sessionDb = new Shopify.Session.SQLiteSessionStorage(dbFile);
// Initialize SQLite DB
QRCodesDB.db = sessionDb.db;
QRCodesDB.init();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(','),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ''),
  HOST_SCHEME: process.env.HOST.split('://')[0],
  API_VERSION: LATEST_API_VERSION,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  // See note below regarding using CustomSessionStorage with this template.
  SESSION_STORAGE: sessionDb,
  ...(process.env.SHOP_CUSTOM_DOMAIN && {
    CUSTOM_SHOP_DOMAINS: [process.env.SHOP_CUSTOM_DOMAIN],
  }),
});

Shopify.Webhooks.Registry.addHandler('APP_UNINSTALLED', {
  path: '/api/webhooks',
  webhookHandler: async (_topic, shop, _body) => {
    await AppInstallations.delete(shop);
  },
});

export default Shopify;

export { default as redirectToAuth } from './redirectToAuth';
export { AppInstallations } from './appInstallations';
