import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutUser } from "../../actions/authActions";


class Business extends Component {
   onSignOutClick = (e) => {
       e.preventDefault();
       this.props.signOutUser();
   };
   
    render(){
        const { user } = this.props.auth;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                    <h3>
                        <b>Hey there,</b>{user.firstName.split(" ")[0]}
                    </h3>
                    <p>Welcome to Your Business Page</p>
                    <input type="button" value="Sign Out" onClick={this.onSignOutClick} className="btn btn-primary px-5 my-3"/>
                    </div>
                </div>
            </div>
        );
    };
};

Business.propTypes = {
    signOutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { signOutUser }
)(Business);