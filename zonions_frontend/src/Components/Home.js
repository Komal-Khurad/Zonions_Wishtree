import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import withRestaurantsData from './withRestaurantsData';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    getRestaurantDetails = (restaurant) => {
        localStorage.setItem('restaurantId', restaurant.id);
        this.props.history.push({pathname:`/restaurant/details/${restaurant.id}`, data: restaurant});
    }

    displayActiveRestaurant = (restaurant) =>{
        return (
            <div className="card" key={restaurant.id} >
                <div className="card-body">
                    <h2 className="card-title">{restaurant.restaurantName}</h2>
                    <p className="card-text">{restaurant.tagline}</p>
                    <a className="btn btn-primary" onClick={() => this.getRestaurantDetails(restaurant)}>
                        Restaurant Details
                    </a>
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
                </div>
                <div>
                    <Route>
                        <NavLink className='nav-btn1 btn btn-primary' exact to='/'>Zonions</NavLink>
                        <NavLink className='nav-btn2 btn btn-primary' exact to='/login'>Login</NavLink>
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

