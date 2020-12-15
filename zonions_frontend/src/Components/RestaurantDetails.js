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
        // console.log('details comp id', this.props.location.id)
        const restaurantId = this.props.location.id
        axios.get(`http://localhost:1337/restaurant/find/${restaurantId}`)
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

    // componentDidUpdate() {
    //     this.fectchIndividualRestaurant();
    // }

    backToHomePage = () => {
        this.props.history.goBack()
    }

    render() {
        const { restaurants } = this.props;
        const { individualRestaurant } = this.state;
        return (
            <div >
                {/* <h1 >{individualRestaurant.restaurantName}</h1> */}

                <div className='row' >
                    <div className='col-md-12' >
                        <h1>{individualRestaurant.restaurantName}</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <table className='table table-hover'>
                            <tbody>
                                <tr>
                                    <td>Address</td>
                                    <td>{individualRestaurant.address}</td>
                                </tr>
                                <tr>
                                    <td>Opening Time</td>
                                    <td>{individualRestaurant.openingTime}</td>
                                </tr>
                                <tr>
                                    <td>Closing Time</td>
                                    <td>{individualRestaurant.closingTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-6'>
                       <img style={{ width:'400px', height: 'auto' }} src={individualRestaurant.imgUrl} alt={individualRestaurant.imgAlt} />
                    </div>
                </div>

                <div>
                    <button className='btn btn-primary' onClick={this.backToHomePage}>Back To Restaurant List</button>

                </div>
            </div>
        )
    }
}
export default RestaurantDetails

// export default withRestaurantsData(RestaurantDetails)
