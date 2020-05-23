/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './components/home.component';
import SignUp from './components/signup.component';
import SignIn from './components/signin.component';
import Reset from './components/reset.component';
import Footer from './components/footer.component';
import Header from './components/header.component';

class App extends Component {
  
  render() {
   
    return (
      < Router>
        <div className="container">
          <Header/>
         <br/>
        
          <Route path="/" exact component={ Home } />
          <Route path="/signup" component={ SignUp } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/reset"  component={ Reset } />
 
        
        <Footer/>
      </div>
     
      </Router>
    );
  }
}
export default App;
