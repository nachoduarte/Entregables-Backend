/**
 * Productos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

  attributes: {
    title: {type: 'string', required: true},
    price: {type: 'number', required: true},
    thumbnail: {type: 'string', required: true} 
  },
};