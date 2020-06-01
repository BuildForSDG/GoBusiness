import React , { Component } from 'react';


export default class BizDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            biz_name: "",
            biz_category: "",
            biz_registration: "",
            biz_description: ""
        };
        this.onChangeBizName = this.onChangeBizName.bind(this);
        this.onChangeBizCategory = this.onChangeBizCategory.bind(this);
        this.onChangeBizRegistration = this.onChangeBizRegistration.bind(this);
    }
}
