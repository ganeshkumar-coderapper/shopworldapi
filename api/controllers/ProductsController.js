/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function (req, res) {
    if (_.get(req, 'body.id')) {
      try {
        let prId = req.body.id.toString();
        let prCount = await Product.count({ id: prId });
        if (prCount > 0) {
          return res.json({ status: false, msg: `Product with requested id ${prId} already exists` });
        } else {
          let prCr = await Product.create(
            {
              id: prId,
              title: req.body.title,
              data: req.body
            }
          ).fetch();

          return res.json({ status: true, msg: `Successfully created product with id ${prCr.id}` });
        }
      } catch (err) {
        return res.status(500).json({ status: false, msg: 'Server error', err: err });
      }
    } else {
      return res.json({ status: false, msg: `Invalid request` });
    }
  },

  update: async function (req, res) {
    if (_.get(req, 'body.id')) {
      try {
        let prId = req.body.id.toString();
        let prCount = await Product.count({ id: prId });
        if (prCount <= 0) {
          return res.json({ status: false, msg: `Product with requested id ${prId} not found` });
        } else {
          let prUp = await Product.updateOne({ id: prId }).set(
            {
              title: req.body.title,
              data: req.body
            }
          );

          return res.json({ status: true, msg: `Successfully updated product` });
        }
      } catch (err) {
        return res.status(500).json({ status: false, msg: 'Server error', err: err });
      }
    } else {
      return res.json({ status: false, msg: `Invalid request` });
    }
  }

};

