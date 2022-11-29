import { errorHandler, jwtMiddleware } from 'helpers/api';
import verifyRequest from '../middleware/verify-request.js';

export function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // global middleware
      await verifyRequest(req, res);

      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
// https://jasonwatmore.com/post/2021/08/20/next-js-api-add-middleware-to-api-routes-example-tutorial
// https://github.com/t-kelly/nextjs-shopify-app/blob/main/lib/shopify.js
