import React,{Component} from 'react';

export default class FunctionComponent extends Component{
    constructor(props) {
        super(props);
        this.state={
            name:this.props.name,
            expression:this.props.expression,
            isEditFieldActive:false
        };
        this.onEdit = this.onEdit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onExpressionKeyPress = this.onExpressionKeyPress.bind(this);
        this.onExpressionChange = this.onExpressionChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onExpressionChange(event){
        this.setState({expression: event.target.value});
    }

    onExpressionKeyPress(event){
        if(event.key === 'Enter'){
            this.props.putFunction({
                name:this.state.name,
                expression:this.state.expression
            });
        }
    }

    onEdit(){
        this.setState({isEditFieldActive:!this.state.isEditFieldActive});
    }

    onCancel(){
        this.setState({isEditFieldActive:false});
    }

    onRemove(){
        this.props.deleteFunction(this.props.name);
    }

    render(){
        let expressionEditField;
        if(this.state.isEditFieldActive){
            expressionEditField=(
                <div className="container-fluid d-inline-block">
                    <div className="input-group mb-3" style={{padding:'0px'}}>
                        <div className="input-group-prepend" style={{padding:'0px'}}>
                            <button type="button" className="btn btn-sm btn-dark" onClick={this.onCancel}>
                                <span className="fa fa-times"/>
                            </button>
                        </div>
                        <input type="text"
                               className="form-control"
                               placeholder="1 + 2 * 3 / 4 - f1"
                               onKeyPress={this.onExpressionKeyPress}
                               onChange={this.onExpressionChange}
                               style={{padding:'0px'}}
                        />
                    </div>
                </div>
            );
        }
        return(
            <div>
                <li className="list-group-item" style={{background:'none',hover:{
                        background: 'white'
                    }}}>
                    <div className="d-inline-block" style={{overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', width:'240px',padding:'0',paddingRight:0 }}>
                        <b>{this.props.name}</b> = {this.props.expression}
                    </div>
                    <button type="button" className="btn btn-dark btn-sm pull-right" onClick={this.onRemove}>
                        <span className="fa text-danger fa-trash"/>
                    </button>
                    <button type="button" className="btn btn-dark btn-sm pull-right" style={{marginRight:'3px'}} onClick={this.onEdit}>
                        <span className="fa text-warning fa-pencil"/>
                    </button>
                </li>
                {expressionEditField}
            </div>

        );
    }
}