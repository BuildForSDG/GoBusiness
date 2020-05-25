import React, { Component } from 'react';


export default class Business extends Component {
   
    // handle click event of Signout
     logOut = () => {
        this.props.history.push('/signin')
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                    <h3>Business Profile</h3>
                    <input type="button" value="Sign Out" onClick={this.logOut} className="btn btn-primary px-5 my-3"/>
                    </div>
                </div>
               
            </div>
        )
    }
}