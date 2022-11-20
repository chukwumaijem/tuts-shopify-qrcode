import Shopify, { redirectToAuth, AppInstallations } from './shopify';

export async function middleware(req, res, next) {
  if (typeof req.query.shop !== 'string') {
    res.status(500);
    return res.send('No shop provided');
  }

  const shop = Shopify.Utils.sanitizeShop(req.query.shop);
  const appInstalled = await AppInstallations.includes(shop);

  if (!appInstalled && !req.originalUrl.match(/^\/exitiframe/i)) {
    return redirectToAuth(req, res, app);
  }

  if (Shopify.Context.IS_EMBEDDED_APP && req.query.embedded !== '1') {
    const embeddedUrl = Shopify.Utils.getEmbeddedAppUrl(req);

    return res.redirect(embeddedUrl + req.path);
  }

  if (Shopify.Context.IS_EMBEDDED_APP && shop) {
    const encodeShop = encodeURIComponent(shop);
    res.setHeader(
      'Content-Security-Policy',
      `frame-ancestors https://${encodeShop} https://admin.shopify.com;`
    );
  } else {
    res.setHeader('Content-Security-Policy', `frame-ancestors 'none';`);
  }
}
