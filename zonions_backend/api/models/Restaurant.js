/**
 * Task.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    restaurantName: {
      type: 'string',
      required: true,
      columnName: 'restaurant_name'
    },
    tagline:{
      type: 'string',
      columnName: 'tag_line',
      defaultsTo: ''
    },
    address: {
      type: 'string',
      required: true,
    },
    phone:{
      type: 'string',
      required: true,
      maxLength: 10
    },
    openingTime:{
      type: 'string',
      columnName: 'opening_time'
    },
    closingTime:{
      type:'string',
      columnName: 'closing_time'
    },
    imgUrl: {
      type: 'string',
      required: true,
      isURL: true
    },
    imgAlt: {
      type: 'string',
      defaultsTo: ''
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true,
    }
  },

};

