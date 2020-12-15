import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Button, Card, Carousel, Container, Jumbotron, Spinner } from 'react-bootstrap';
import withRestaurantsData from './withRestaurantsData';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    getRestaurantDetails = (id) => {
        this.props.history.push({pathname:`/restaurant/details/${id}`, id: `${id}`});
    }

    displayActiveRestaurant = (restaurant) =>{
        return (
            <div className="card" key={restaurant.id} >
                <div className="card-body">
                    <h2 className="card-title">{restaurant.restaurantName}</h2>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a className="btn btn-primary" onClick={()=> this.getRestaurantDetails(restaurant.id)}>Go somewhere</a>
                </div>
            </div>
        )
    }

    render() {
        const { restaurants } = this.props;
        return (
            <div className='home-main-div'>
                <Route>
                    <NavLink className='btn btn-primary home-brand' exact to='/'>Zonions</NavLink>
                    <NavLink className='btn btn-primary home-link' exact to='/login'>Admin Login</NavLink>
                </Route>
                <div>
                    <h1 className='home-header'>Zonions App</h1>
                </div>
                {
                    restaurants.map(restaurant => {
                        return restaurant.isActive ? this.displayActiveRestaurant(restaurant):null 
                    })
                }
            </div>
        )
    }
}

export default withRestaurantsData(Home);
