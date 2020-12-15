import React, { Component } from 'react'
import axios from 'axios';

const withRestaurantsData = (WrappedComponent) =>{
    
    class RestaurantsData extends Component {
        constructor(props) {
            super(props)
        
            this.state = {
                restaurants: [] 
            }
        }

        fetchData = () => {
            axios.get('http://localhost:1337/restaurant/find')
            .then((res)=>{
                this.setState({
                    restaurants: res.data
                })
            })
            .catch((err)=>{
                console.log('error: ', err);
            });
        }
        
        componentDidMount() {
             this.fetchData();
        }
    //     componentDidUpdate() {
    //         this.fetchData();
    //    }

        render() {
           return <WrappedComponent 
                    restaurants = {this.state.restaurants} 
                    {...this.props}
                />
        }
    }
    return RestaurantsData
}

export default withRestaurantsData;
