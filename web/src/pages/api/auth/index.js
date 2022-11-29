import redirectToAuth from '../shopify/redirect-to-auth';

export function auth(req, res) {
  return redirectToAuth(req, res);
}
