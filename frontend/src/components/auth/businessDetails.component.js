import React , { Component } from 'react';
import swal from 'sweetalert';


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
        this.onChangeBizDescription = this.onChangeBizRegistration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    
    onChangeBizName(e){
        this.setState({
            biz_name: e.target.value
        })
    }

    onChangeBizCategory(e){
        this.setState({
            biz_category: e.target.value
        })
    }

    onChangeBizRegistration(e){
        this.setState({
            biz_description: e.target.value
        })
    }

    onChangeBizDescription(e){
        this.setState({
            biz_description: e.target.value
        })
    }

    onSubmit(e){
       e.preventDefault(e);
       const bizDetails = {
           biz_name: this.state.biz_name,
           biz_category: this.state.biz_category,
           biz_registration: this.state.biz_registration
       };
       if(!this.state.biz_name || !this.state.biz_category || !this.state.biz_registration || !this.state.biz_description){
            swal("Aw!","All fields are Required","error");
       } else {
        console.log(bizDetails);
        /**Api Call here */
       }
    };
    render(){
        return (
            <div className="col-sm-12 col-md-6 col-lg-5 my-5">
                <h3>Create Your Business Details</h3>
            </div>
        )
    }
}
