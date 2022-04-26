/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'products',
  attributes: {
    id: { type: 'string', required: true, unique: true },
    title: { type: 'string', required: true },
    data: { type: 'json' }
  },

};
