import React, { Component } from 'react';

import UserService from '../services/user.service';

export default class InvestorUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getInvestorBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                    (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                });
            }
        );
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h3>{this.state.content}</h3>
                    </div>
                </div>
            </div>
        )
    }
}