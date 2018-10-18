import React, { Component } from 'react';
import {errorToast} from "../../../../actions/Toasties";

export default class NewFunctionComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            expression:""
        };
        this.onNewClick=this.onNewClick.bind(this);
        this.onExpressionInput=this.onExpressionInput.bind(this);
        this.onNameInput=this.onNameInput.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onExpressionChange=this.onExpressionChange.bind(this);

    }

    onNameChange(event){
        this.setState({name: event.target.value});
    }

    onExpressionChange(event){
        this.setState({expression: event.target.value});
    }

    onExpressionInput(event){
        if(event.key === 'Enter'){
            this.onNewClick()
        }
    }

    onNameInput(event){
        if(event.key === 'Enter'){
            this.onNewClick()
        }
    }

    onNewClick(event){
        if (this.state.name === ""){
            errorToast("Name input field can't be empty");
            return;
        }
        else if( this.state.expression === ""){
            errorToast("Expression input field can't be empty");
            return;
        }
        this.props.postFunction({
            name:this.state.name,
            expression:this.state.expression
        });
    }

    render(){
        return(
            <div>
                <div className="text-center justify-content-between"  style={{paddingTop:'2em',paddingBottom:'2em'}}>
                    <h4 className="navbar-text">Define a function</h4>
                </div>
                <div className="form-group row">
                    <label htmlFor="function1" className="col-sm-2 col-form-label" >Name:</label>
                    <div className="col-sm-10" style={{paddingLeft:'40px'}}>
                        <input type="text"
                               className="form-control"
                               id="function1"
                               placeholder="f1"
                               onKeyPress={this.onNameInput}
                               onChange={this.onNameChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="function2" className="col-sm-2 col-form-label">Expression:</label>
                    <div className="col-sm-10" style={{paddingLeft:'40px'}}>
                        <input type="text"
                               className="form-control"
                               id="function2"
                               placeholder="1 + 2 * 3"
                               onKeyPress={this.onExpressionInput}
                               onChange={this.onExpressionChange}
                        />
                    </div>
                </div>
                <div style={{marginTop:'20px'}}>
                    <button type="button" className="btn btn-light btn-block" onClick={this.onNewClick} style={{marginTop:'10px'}}>
                        <span className="fa fa-plus float-left" style={{marginLeft:'10px'}}/>
                        &nbsp;
                        Define Function
                    </button>
                </div>
            </div>
        );
    }
}