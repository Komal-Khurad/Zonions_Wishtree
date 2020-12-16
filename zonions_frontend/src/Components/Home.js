import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Button, Card, Carousel, Container, Jumbotron, Spinner } from 'react-bootstrap';
import withRestaurantsData from './withRestaurantsData';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    getRestaurantDetails = (id) => {
        localStorage.setItem('restaurantId', id);
        this.props.history.push({pathname:`/restaurant/details/${id}`, id: `${id}`});
    }

    displayActiveRestaurant = (restaurant) =>{
        return (
            <div className="card" key={restaurant.id} >
                <div className="card-body">
                    <h2 className="card-title">{restaurant.restaurantName}</h2>
                    <p className="card-text">Sample Texts</p>
                    <a className="btn btn-primary" onClick={()=> this.getRestaurantDetails(restaurant.id)}>Restaurant Details</a>
                </div>
            </div>
        )
    }

    render() {
        const { restaurants } = this.props;
        return (
            <div className='home-main-div'>
                <div>
                    <h1 className='home-header'>Zonions App</h1>
                    <Route>
                        <NavLink className='nav-btn1 btn btn-primary home-brand' exact to='/'>Zonions</NavLink>
                        <NavLink className='nav-btn2 btn btn-primary home-link' exact to='/login'>Admin Login</NavLink>
                    </Route>
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
