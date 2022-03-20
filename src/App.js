import React from 'react';
import './App.css';

import styled from 'styled-components';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { connect } from 'react-redux';
import { setCurrentUser, checkUserSession } from './redux/user/user.actions';

import {createStructuredSelector } from 'reselect';

// import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>  
// );

class App extends React.Component {

    unsubscribeFromAuth = null;

    // constructor(){
    //   super();    

    //   this.state = {
    //     currentUser: null
    //   }
    // }

    componentDidMount(){
      const {checkUserSession} = this.props;
      checkUserSession();
    }


    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }

    render(){
      return (
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} ></Route>  
            <Route  path='/shop' component={ShopPage}></Route>  
            <Route exact path='/signin' render = {() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUpPage />) } ></Route>
            <Route exact path='/checkout' component={CheckoutPage}></Route>
          </Switch>
        </div>
      );
    }
  
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   // collectionsArray: selectCollectionsForPreview
// });

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession())
})


export default connect(null, mapDispatchToProps)(App);
