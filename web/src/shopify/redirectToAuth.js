import { Shopify } from '@shopify/shopify-api';
import { USE_ONLINE_TOKENS } from '../constants';

export default async function redirectToAuth(req, res) {
  if (!req.query.shop) {
    res.status(500);
    return res.send('No shop provided');
  }

  if (req.query.embedded === '1') {
    return clientSideRedirect(req, res);
  }

  return await serverSideRedirect(req, res);
}

function clientSideRedirect(req, res) {
  const shop = Shopify.Utils.sanitizeShop(req.query.shop);
  const redirectUriParams = new URLSearchParams({
    shop,
    host: req.query.host,
  }).toString();
  const queryParams = new URLSearchParams({
    ...req.query,
    shop,
    redirectUri: `https://${Shopify.Context.HOST_NAME}/api/auth?${redirectUriParams}`,
  }).toString();

  return res.redirect(`/exitiframe?${queryParams}`);
}

async function serverSideRedirect(req, res) {
  const redirectUrl = await Shopify.Auth.beginAuth(
    req,
    res,
    req.query.shop,
    '/api/auth/callback',
    USE_ONLINE_TOKENS
  );

  return res.redirect(redirectUrl);
}
