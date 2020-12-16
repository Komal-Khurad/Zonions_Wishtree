/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  /**
   * `RestaurantController.create()`
   */
  create: async function (req, res) {
    try{
      let param = req.allParams();
      console.log(param);

      const restaurant = await Restaurant.create({
        restaurantName:param.restaurantName,
        tagline:param.tagline,
        address: param.address,
        phone: param.phone,
        openingTime: param.openingTime,
        closingTime: param.closingTime,
        imgUrl: param.imgUrl,
        imgAlt: param.imgAlt
      })

      console.log('restaurant added successfully!');
      return res.ok(restaurant);
    }
    catch(error){
      return res.serverError(error);
    }
  },

  /**
   * `RestaurantController.find()`
   */
  find: async function (req, res) {
    try{
      const restaurants = await Restaurant.find();
      
      return res.ok(restaurants);

    }
    catch(error)
    {
      return res.serverError(error);
    }
  },

  /**
   * `RestaurantController.findOne()`
   */
  findOne: async function (req, res) {
    try{
      const restaurant = await Restaurant.findOne({
        id:req.params.id
      });
      return res.ok(restaurant);
    }
    catch(error){
      return res.serverError(error);
    }
  },

  /**
   * `RestaurantController.update()`
   */
  update: async function (req, res) {
    try{
      let param = req.allParams();

      console.log('update params: ', param);

      let attribute = {};
      if(param.restaurantName)
        attribute.restaurantName = param.restaurantName;
      if(param.address)
        attribute.address = param.address;
      if(param.phone)
        attribute.phone = param.phone;
      if(param.openingTime)
        attribute.openingTime = param.openingTime;
      if(param.closingTime)
        attribute.closingTime = param.closingTime;
      if(param.imgUrl)
        attribute.imgUrl = param.imgUrl;
      if(param.imgAlt)
        attribute.imgAlt = param.imgAlt;
      if(param.tagline)
        attribute.tagline = param.tagline;
      if(param.isActive)
      {
        console.log('inside if of isActive')
        attribute.isActive = param.isActive;
      }
      else{
        console.log('inside else of isActive')
        attribute.isActive = param.isActive;
      }

      console.log('attribute from Front end', attribute)
      
      const result = await Restaurant.update({id:param.id}, attribute);
      console.log('after update: ', result);
      return res.ok(result);
    }
    catch(error){
      res.serverError(err);
      console.log('error server side', error)
    }
  },

  /**
   * `RestaurantController.delete()`
   */
  delete: async function (req, res) {
    try
    {
      const result = await Restaurant.destroy({
        id:req.params.id
      });
      res.ok(result);
    }
    catch(err)
    {
      res.serverError(err);
    }
  }
};

