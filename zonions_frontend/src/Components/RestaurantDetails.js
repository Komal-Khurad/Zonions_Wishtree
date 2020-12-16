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
        // const { restaurants } = this.props;
        const { individualRestaurant } = this.state;
        return (
            <div className='restaurant-details-div'>
                
                <div className='row'>
                    <div className='col-md-12' >
                        <h1 style={{textAlign:'center', fontWeight:'bolder', marginTop:'30px', marginBottom:'15px'}}>{individualRestaurant.restaurantName}</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <table className='table table-hover'>
                            <tbody>
                                <tr>
                                    <td style={{color:'white'}}>Address</td>
                                    <td style={{color:'white'}}>{individualRestaurant.address}</td>
                                </tr>
                                <tr>
                                    <td style={{color:'white'}}>Opening Time</td>
                                    <td style={{color:'white'}}>{individualRestaurant.openingTime}</td>
                                </tr>
                                <tr>
                                    <td style={{color:'white'}}>Closing Time</td>
                                    <td style={{color:'white'}}>{individualRestaurant.closingTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-6'>
                       <img style={{ width:'500px', height: '400px' }} 
                       src={individualRestaurant.imgUrl} alt={individualRestaurant.imgAlt} />
                    </div>
                </div>

                <div>
                    <button className='btn btn-primary'
                        onClick={this.backToHomePage}>
                        Back To Restaurant List
                    </button>

                </div>
            </div>
        )
    }
}
export default RestaurantDetails

// export default withRestaurantsData(RestaurantDetails)
