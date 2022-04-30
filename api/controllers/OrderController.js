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
        
        axios({
          url: `${sails.config.custom.shopify_url}/admin/api/2022-04/graphql.json`,
          method: 'post', headers: {'X-Shopify-Access-Token': sails.config.custom.shopify_access_token}, 
          data: {
            query: `
              mutation orderEditBegin{
                orderEditBegin(id: "gid://shopify/Order/${orderId}"){
                  calculatedOrder{
                    id 
                    lineItems(first: 1) {
                      edges{
                        node{
                          id
                          quantity
                        }
                      }
                    }
                  }
                }
              }
            `
          }
        })
        .then(function (response) {
          axios({
            url: `${sails.config.custom.shopify_url}/admin/api/2022-04/graphql.json`,
            method: 'post', headers: {'X-Shopify-Access-Token': sails.config.custom.shopify_access_token}, 
            data: {
              query: `
                mutation orderEditSetQuantity {
                  orderEditSetQuantity(id: "${response.data.data.orderEditBegin.calculatedOrder.id}", 
                  lineItemId: "${response.data.data.orderEditBegin.calculatedOrder.lineItems.edges[0].node.id}", 
                  quantity: ${response.data.data.orderEditBegin.calculatedOrder.lineItems.edges[0].node.quantity + 3}) {
                    calculatedOrder {
                      id
                    }
                    calculatedLineItem {
                      id
                      quantity
                    }
                  }
                }
              `
            }
          })
          .then(function (response) {
            axios({
              url: `${sails.config.custom.shopify_url}/admin/api/2022-04/graphql.json`,
              method: 'post', headers: {'X-Shopify-Access-Token': sails.config.custom.shopify_access_token}, 
              data: {
                query: `
                  mutation orderEditCommit {
                    orderEditCommit(id: "${response.data.data.orderEditSetQuantity.calculatedOrder.id}", 
                    notifyCustomer: true, staffNote: "Order's first line item quantity increased by 3") {
                      order {
                        id
                        lineItems(first: 1) {
                            edges{
                                node{
                                    id
                                    quantity
                                }
                            }
                        }
                      }
                    }
                  }
                `
              }
            })
            .then(function (response) {
              return res.json({ status: true, msg: `Order's first line item quantity increased by 3`, data: response.data });
            })
            .catch(function (er) {
              return res.json({ status: false, msg: `Error`, er: er });
            });
          })
          .catch(function (er) {
            return res.json({ status: false, msg: `Error`, er: er });
          });
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

  cancel: async function (req, res) {
    if (_.get(req, 'body.order_id')) {
      try {
        let orderId = req.body.order_id;
        axios.post(`${sails.config.custom.shopify_url}/admin/api/2022-04/orders/${orderId}/cancel.json`, 
          {email: true}, 
          {headers: {'X-Shopify-Access-Token': sails.config.custom.shopify_access_token} }
        )
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
