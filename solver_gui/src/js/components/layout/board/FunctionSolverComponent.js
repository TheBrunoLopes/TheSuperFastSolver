import React, { Component } from 'react';

export default class Board extends Component {
    constructor(props){
        super(props);
        this.state={
            result:this.props.solvedFuction,
            expression:""
        };
        this.onExpressionKeyPress = this.onExpressionKeyPress.bind(this);
        this.onExpressionChange = this.onExpressionChange.bind(this);
        this.onSolveClick = this.onSolveClick.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            result: newProps.solvedFunction
        });
    }

    onExpressionChange(event){
        this.setState({expression: event.target.value});
    }

    onExpressionKeyPress(event){
        if(event.key === 'Enter'){
            this.onSolveClick()
        }
    }

    onSolveClick(){
        this.props.solveFunction({
            expression:this.state.expression
        });
    }

    render() {
        return (
            <div className="row justify-content-md-center container mx-auto" style={
                {
                    minHeight:'70vh',
                    display:'flex',
                    alignItems:'center'
                }
            }>
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-info">
                            <h5 className="text-white">
                                Function Solver
                            </h5>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="form-group row">
                                    <label htmlFor="function1" className="col-sm-2 col-form-label"><b style={{color:'black'}}>Expression:</b></label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                               className="form-control"
                                               id="function1"
                                               placeholder="1 + 2 * 3"
                                               onKeyPress={this.onExpressionKeyPress}
                                               onChange={this.onExpressionChange}
                                               required/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="result1" className="col-sm-2 col-form-label"><b style={{color:'black'}}>Result:</b></label>
                                    <div className="col-sm-10">
                                        <span style={{color:'black'}}>{this.state.result}</span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit"
                                                name="solveFunction"
                                                className="btn btn-primary"
                                                onClick={this.onSolveClick}
                                        ><b>Solve</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}