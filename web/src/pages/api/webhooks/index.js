import { apiHandler } from 'helpers/api';

export default apiHandler({
  post: webhook,
});

// Do not call app.use(express.json()) before processing webhooks with
// Shopify.Webhooks.Registry.process().
// See https://github.com/Shopify/shopify-api-node/blob/main/docs/usage/webhooks.md#note-regarding-use-of-body-parsers
// for more details.
async function webhook(req, res) {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log(`Webhook processed, returned status code 200`);
  } catch (e) {
    console.log(`Failed to process webhook: ${e.message}`);
    if (!res.headersSent) {
      res.status(500).send(e.message);
    }
  }
}
