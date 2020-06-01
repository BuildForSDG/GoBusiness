import React , { Component } from 'react';
import swal from 'sweetalert';


export default class BizDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            biz_name: "",
            biz_description: "",
            biz_address: "",
            biz_cacNumber: "",
            biz_website: "",
            biz_email: "",
            biz_phoneNumber: ""
        };
        this.onChangeBizName = this.onChangeBizName.bind(this);
        this.onChangeBizDescription = this.onChangeBizDescription.bind(this);
        this.onChangeBizAddress = this.onChangeBizAddress.bind(this);
        this.onChangeBizCacNumber = this.onChangeBizCacNumber.bind(this);
        this.onChangeBizWebsite = this.onChangeBizWebsite.bind(this);
        this.onChangeBizEmail = this.onChangeBizEmail.bind(this);
        this.onChangeBizPhoneNumber = this.onChangeBizPhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    
    onChangeBizName(e){
        this.setState({
            biz_name: e.target.value
        })
    }

    onChangeBizDescription(e){
        this.setState({
            biz_description: e.target.value
        })
    }

    onChangeBizAddress(e){
        this.setState({
            biz_address: e.target.value
        })
    }

    onChangeBizCacNumber(e){
        this.setState({
            biz_cacNumber: e.target.value
        })
    }

    onChangeBizWebsite(e){
        this.setState({
            biz_website: e.target.value
        })
    }

    onChangeBizEmail(e){
        this.setState({
            biz_email: e.target.value
        })
    }

    onChangeBizPhoneNumber(e){
        this.setState({
            biz_phoneNumber: e.target.value
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
