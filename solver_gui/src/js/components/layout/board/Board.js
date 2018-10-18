import React, { Component } from 'react';
// Redux related imports
import {solveFunction} from "../../../actions/functions-actions";
import {connect} from 'react-redux';
import FunctionSolverComponent from "./FunctionSolverComponent";

class Board extends Component {

    render() {
        return (
            <div className="content-wrapper">
                <div className="content">
                    <FunctionSolverComponent
                        solveFunction={this.props.solveFunction}
                        solvedFunction={this.props.functionS.solvedFunction}
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
    solveFunction:solveFunction
};

export default connect(mapStateToProps, mapActionsToProps)(Board);