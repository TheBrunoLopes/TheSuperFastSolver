import React,{Component} from 'react';
import FunctionComponent from "./FunctionComponent";
export default class FunctionsList extends Component{

    componentWillReceiveProps(newProps){
        this.setState({
            functionsList: newProps.functionsList
        });
    }

    render(){
        let functionsList= this.props.functionsList.map((functionObject) => {
            return (
                <FunctionComponent
                    key={functionObject.name}
                    name={functionObject.name}
                    expression={functionObject.expression}
                    putFunction={this.props.putFunction}
                    deleteFunction={this.props.deleteFunction}/>
            );
        });
        return(
            <div>
                <div className="text-center justify-content-between"  style={{paddingTop:'5em'}}>
                    <h4 className="navbar-text">List of Functions</h4>
                </div>
                {functionsList}
                <p/>
            </div>
        );
    }
}