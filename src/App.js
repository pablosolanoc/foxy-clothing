import React from 'react';
import './App.css';


import HomePage from './pages/homepage/homepage.component';
import { Route, Switch} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>  
// );

class App extends React.Component {

  constructor(){
    super();    

    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        console.log('User either created or just logged In');
        // console.log(userRef);
        userRef.onSnapshot(snapShot => {
          // console.log(snapShot);S
          this.setState({
            currentUser: 
              {
                id: snapShot.id,
                ...snapShot.data()
              }
          });
          
          console.log(this.state);

        });
      }

      this.setState({currentUser: userAuth});
    });
  }


  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} ></Route>  
          <Route  path='/shop' component={ShopPage}></Route>  
          <Route path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
  
}

export default App;
