import React, { Component } from 'react';
import axios from 'axios';
import withRestaurantsData from './withRestaurantsData';

class RestaurantDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            individualRestaurant: {}
        }
    }

    fectchIndividualRestaurant = () => {
       
        // const restaurantId = this.props.location.id
        
        let finalId = localStorage.getItem('restaurantId');
        console.log('final Id', finalId);

        axios.get(`http://localhost:1337/restaurant/find/${finalId}`)
            .then(res => {
                console.log(res.data);

                this.setState({
                    individualRestaurant: res.data
                })
            })
            .catch(err => {
                console.log('error while fetching resto by id: ', err)
            })
    }

    componentDidMount() {
        this.fectchIndividualRestaurant();
    }

    backToHomePage = () => {
        this.props.history.goBack()
    }

    render() {
        const { individualRestaurant } = this.state;
        return (
            <div className='restaurant-details-div'>
                <div className='row'>
                    <div className='col-md-12' >
                        <h1>{individualRestaurant.restaurantName}</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <table className='table table-borderless restaurant-details-tbody'>
                            <tbody>
                                <tr>
                                    <td>Address:</td>
                                    <td>{individualRestaurant.address}</td>
                                </tr>
                                <tr>
                                    <td>Opening Time:</td>
                                    <td>{individualRestaurant.openingTime}</td>
                                </tr>
                                <tr>
                                    <td>Closing Time:</td>
                                    <td>{individualRestaurant.closingTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-6 manage-img'>
                       <img className='restaurant-img'
                       src={individualRestaurant.imgUrl} alt={individualRestaurant.imgAlt} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <button className='btn btn-primary back-to-home'
                            onClick={this.backToHomePage}>
                            Back To Restaurant List
                        </button>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        )
    }
}
export default RestaurantDetails

// export default withRestaurantsData(RestaurantDetails)
