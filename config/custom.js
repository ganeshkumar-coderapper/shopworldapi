/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

const Sails = require("sails/lib/app/Sails");
const local = require('./local')

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

  shopify_url: 'https://shopworld-dev.myshopify.com', 
  shopify_access_token: local.shopify_access_token, 
  shopify_api_key: local.shopify_api_key, 
  shopify_api_secret: local.shopify_api_secret

};
