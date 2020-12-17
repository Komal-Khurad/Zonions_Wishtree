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

    //Routes For Restaurant CRUD
    'POST /restaurant/create': 'RestaurantController.create',
    'GET /restaurant/find': 'RestaurantController.find',
    'GET /restaurant/find/:id': 'RestaurantController.findOne',
    'PUT /restaurant/update/:id': 'RestaurantController.update',
    'DELETE /restaurant/delete/:id': 'RestaurantController.delete',

};
