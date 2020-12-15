import './App.css';
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminLogin from './Components/AdminLogin';

import Home from './Components/Home';
import RestaurantDetails from './Components/RestaurantDetails';
import ManageRestaurant from './Components/ManageRestaurant';
import AddRestaurant from './Components/AddRestaurant';


const cookieToken = Cookies.get();

function App() {
  return (
    <div className='container'>
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/restaurant/details/:id' exact component={RestaurantDetails} />
            <Route path='/restaurant/add' exact component={AddRestaurant}/>          
            <Route path='/login' exact component={AdminLogin} />
            <Route path='/restaurant/manage' exact token={cookieToken} component={ManageRestaurant} />
          </Switch>
      </Router> 
    </div>
      
  );
}
export default App;
