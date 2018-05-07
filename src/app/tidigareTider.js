import React, {Component} from "react";
import ReactDOM from "react-dom";

class TidigareTider extends Component{
	render(){
		return(
			<li>{this.props.tid}</li>
		);
	}	
}
export default TidigareTider;