/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios').default;

module.exports = {
  
  updateqty: async function (req, res) {
    if (_.get(req, 'body.order_id')) {
      try {
        let orderId = req.body.order_id;
        
      } catch (err) {
        return res.status(500).json({ status: false, msg: 'Server error', err: err });
      }
    } else {
      return res.json({ status: false, msg: `Invalid request` });
    }
  },

  cancel: async function (req, res) {
    if (_.get(req, 'body.order_id')) {
      try {
        let orderId = req.body.order_id;
        axios.post(`${sails.config.custom.shopify_url}/admin/api/2022-04/orders/${orderId}/cancel.json`, {}, {
          headers: { 'X-Shopify-Access-Token': sails.config.custom.shopify_access_token }
        })
        .then(function (response) {
          return res.json({ status: true, msg: `Order cancelled` });
        })
        .catch(function (er) {
          return res.json({ status: false, msg: `Error`, er: er });
        });
      } catch (err) {
        return res.status(500).json({ status: false, msg: 'Server error', err: err });
      }
    } else {
      return res.json({ status: false, msg: `Invalid request` });
    }
  }, 

};
