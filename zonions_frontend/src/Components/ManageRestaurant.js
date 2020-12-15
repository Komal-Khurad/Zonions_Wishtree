import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import withRestaurantsData from './withRestaurantsData';

class ManageRestaurant extends Component {

    constructor(props) {
        super(props)
    }
    addNew = () => {
        this.props.history.push({ pathname: '/restaurant/add' })
    }
    // componentDidUpdate() {
    //     console.log('from component did update of manage', this.props.restaurant)
    // }

    deleteData(id) {
        alert('are you sure?');

        axios.delete(`http://localhost:1337/restaurant/delete/${id}`)
            .then((res) => {
                alert('Restaurant deleted successfully')
            })
            .catch((err) => console.log('error while deleting restaurant', err));
    }
    updateData(id) {
        this.props.history.push('/restaurant/add')
        axios.put(`http://localhost:1337/restaurant/update/${id}`)
            .then((res) => {
                alert('Restaurant updated successfully')
                console.log('updated res', res)
            })
            .catch((err) => console.log('error while deleting restaurant', err));
    }
    deactivate(id) {
        axios.get(`http://localhost:1337/restaurant/find/${id}`)
            .then(res => {
                console.log('before updating status ', res.data.isActive);

                let activeStatus= !(res.data.isActive);
               
                axios.put(`http://localhost:1337/restaurant/update/${id}`, {isActive: activeStatus})
                    .then((response) => {
                        console.log('after updated active status', response.data.data)
                    })
                    .catch((error) => console.log('error while deactivatin resto', error));

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
        const { restaurants } = this.props;

        return (
            <div className='container'>
                <table className='table table-hover table-dark' style={{ textAlign: 'center' }}>
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
                            restaurants.map(restaurant => {
                                return (
                                    <tr key={restaurant.id}>
                                        <td>{restaurant.restaurantName}</td>
                                        <td>{restaurant.openingTime}</td>
                                        <td>{restaurant.closingTime}</td>
                                        <td>{restaurant.updatedAt}</td>
                                        <td>
                                            <button className='btn btn-success' onClick={() => this.updateData(restaurant.id)}>Edit</button>&nbsp;&nbsp;
                                            <button className='btn btn-danger' onClick={() => this.deleteData(restaurant.id)}>Delete</button>&nbsp;&nbsp;
                                            <button className='btn btn-secondary' onClick={() => this.deactivate(restaurant.id)}>Deactivate</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <button className='btn btn-primary' onClick={this.addNew} style={{ marginLeft: '30%' }}>Add</button>

                <button className='btn btn-primary' onClick={this.signOut} style={{ marginLeft: '10%' }}>Signout</button>
            </div >
        )
    }
}

export default withRestaurantsData(ManageRestaurant)
