import React, {Component} from "react";
import ReactDOM from "react-dom";

class Stoppur extends Component{
	
	render(){
		var tid = this.props.tid;
		if(tid === ""){
			tid= "00:00:00";
		}

		return(
			<div className="timer">
				<p>{tid}</p>
			</div>
		);
	}	
}


export default Stoppur;

