import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { FaCheck, FaTimes} from 'react-icons/fa';
import axios from 'axios';

class ManageRestaurant extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeStatusFlag: true,
            restaurants: []
        }
    }
    addNew = () => {
        this.props.history.push({ pathname: '/restaurant/add' })
    }

    deleteData(id) {
        alert('are you sure?');

        axios.delete(`http://localhost:1337/restaurant/delete/${id}`)
            .then((res) => {
                alert('Restaurant deleted successfully');
            })
            .catch((err) => console.log('error while deleting restaurant', err));
    }

    fetchData = () => {
        axios.get('http://localhost:1337/restaurant/find')
            .then((res) => {
                this.setState({
                    restaurants: res.data
                })
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        this.fetchData();
    }

    updateData(restaurantObj) {
        this.props.history.push({ pathname: '/restaurant/add', restaurantObj: restaurantObj })
    }

    deactivate(id) {
        axios.get(`http://localhost:1337/restaurant/find/${id}`)
            .then(res => {

                let activeStatus = !(res.data.isActive);

                this.setState({
                    activeStatusFlag: activeStatus
                })
                axios.put(`http://localhost:1337/restaurant/update/${id}`, { isActive: activeStatus })
                    .then((response) => {
                        console.log('after updated active status', response.data.data)
                    })
                    .catch((error) => console.log('error while deactivation restaurant', error));

            })
            .catch(err => {
                console.log('error while fetching resto by id: ', err)
            })
    }

    signOut = () => {
        Cookies.remove('token');
        alert('Signed out successfully')
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='container'>
                <h1 style={{ color: 'white', textAlign: 'center', fontWeight: 'bolder', marginTop: '20px', marginBottom: '20px' }}>Welcome Admin</h1>

                <div className="table-responsive">

                    <table className='table table-bordered' style={{ textAlign: 'center', color: 'white' }}>
                        <thead>
                            <tr>
                                <th>Restaurant Name</th>
                                <th>Opening Time</th>
                                <th>Closing Time</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.restaurants.map(restaurant => {
                                    return (
                                        <tr key={restaurant.id}>
                                            <td>{restaurant.restaurantName}
                                                <span style={{marginLeft:'5px'}}>
                                                    {
                                                        restaurant.isActive ? 
                                                        <FaCheck style={{color:'green', fontWeight:'bolder'}}/>:
                                                        <FaTimes style={{color:'red', fontWeight:'bolder'}}/>
                                                    }
                                                </span>
                                            </td>
                                            <td>{restaurant.openingTime}</td>
                                            <td>{restaurant.closingTime}</td>
                                            <td>{restaurant.updatedAt}</td>
                                            <td style={{textAlign:'left'}}>
                                                <button className='btn btn-success' onClick={() => this.updateData(restaurant)}>Edit</button>&nbsp;&nbsp;

                                            <button className='btn btn-danger' onClick={() => this.deleteData(restaurant.id)}>Delete</button>&nbsp;&nbsp;

                                            <button className='btn btn-secondary' onClick={() => this.deactivate(restaurant.id)}>
                                                {
                                                    restaurant.isActive ? "Deactivate" : "Active"
                                                }
                                            </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <button className='btn btn-primary' onClick={this.addNew} style={{ marginLeft: '30%' }}>Add</button>

                <button className='btn btn-primary' onClick={this.signOut} style={{ marginLeft: '20%' }}>Signout</button>
            </div >
        )
    }
}
export default ManageRestaurant;
