/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /products/create': { controller: 'Products', action: 'create' },
  'POST /products/update': { controller: 'Products', action: 'update' },
  'POST /order/updateqty': { controller: 'Order', action: 'updateqty' },
  'POST /order/cancel': { controller: 'Order', action: 'cancel' },
};
