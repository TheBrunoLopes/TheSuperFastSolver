import React, { Component } from 'react';
import FunctionsList from "./functionsList/FunctionsList";
// Redux related imports
import {deleteFunction, getFunction, postFunction, putFunction} from "../../../actions/functions-actions";
import {connect} from 'react-redux';
import NewFunctionComponent from "./functionsList/NewFunctionComponent";

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.props.getFunction();
        let functionsPoll = setInterval(() => {
            this.props.getFunction();
        }, 4000);
        this.state={functionsPoll:functionsPoll};
    }

    componentWillUnmount(){
        clearInterval(this.state.functionsPoll);
    }

    render() {
        return (
            <div className="sidebar bg-dark">
                <div className="container-fluid">
                    <NewFunctionComponent
                        postFunction={this.props.postFunction}
                    />
                    <FunctionsList
                        functionsList={this.props.functionS.functionsList}
                        putFunction={this.props.putFunction}
                        deleteFunction={this.props.deleteFunction}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        functionS: state.functionS,
    };
};

const mapActionsToProps = {
    getFunction:getFunction,
    postFunction:postFunction,
    putFunction:putFunction,
    deleteFunction:deleteFunction
};
export default connect(mapStateToProps, mapActionsToProps)(Sidebar);