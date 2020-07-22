var Promise = require('bluebird');

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'product',
  label: 'Product',
  alias: 'products',
  addFields: [
    {
      name: 'price',
      type: 'float',
      label: 'Price',
      help: 'In dollars. You may use a decimal point. Do not use a $.',
      required: true
    },
  ],

  construct: function(self, options) {
   
    self.addTask('list', 'Lists public, published products and their URLs', (apos, argv) => {
     
      const req = apos.tasks.getAnonReq();
        return self.find(req).toArray().then(products => {
        products.forEach(product => {
          console.log(product.title + ': ' + product._url);
        });
      });
    });
    self.addTask('discount', 'Lowers prices by the specified percentage.', (apos, argv, callback) => {
      return apos.migrations.eachDoc({ type: 'product' }, (product, callback) => {
        if (!product.price) {
          return setImmediate(callback);
        }
        if (!parseFloat(argv._[1])) {
          return callback('You must specify a discount percentage, such as 10. Do not use a % sign.');
        }
        product.price = product.price - (product.price * argv._[1] / 100);
        return apos.docs.db.update({
          _id: product._id
        }, {
          $set: {
            price: product.price
          }
        }, callback);
      }, callback);
    });

    // Use the "super pattern" to extend the "generate" method, which
    // creates new products when the `products:generate` command line task
    // is run
    const superGenerate = self.generate;
    self.generate = function(i) {
      const product = superGenerate(i);
      product.price = i * 0.5;
      return product;
    };
   
  }
};

