import React, {Component} from "react";
import ReactDOM from "react-dom";
require("./css/design.css");
import Stoppur from "./stoppur";
import TidigareTider from "./tidigareTider";

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			tid: {
			timmar: 0,
			minuter: 0,
			sekunder: 0,
			milisekunder: 0
			},
			start: true,
			tidigareTider: [],
			clear: 0,
			formateradTid: ""
		}
	}

	formatera(timmar , minuter , sekunder , milisekunder){
		var timmarInnanTio = "";
		var minuterInnanTio = "";
		var sekunderInnanTio = "";


		if(timmar <= 9){		
			timmarInnanTio = "0";
		}
		if(minuter <= 9){
			minuterInnanTio = "0";
		}
		if(sekunder <= 9){
			sekunderInnanTio = "0";
		}
		return timmarInnanTio + timmar + ":" +  minuterInnanTio + minuter + ":" + sekunderInnanTio + sekunder;
	}

	tid(){
		if(this.state.start){
			this.setState({start: false});
			var clear = setInterval(function(){
				this.setState({clear: clear});
				var timmar = this.state.tid.timmar;
				var minuter = this.state.tid.minuter;
				var sekunder = this.state.tid.sekunder;
				var milisekunder = this.state.tid.milisekunder;
				var uppdateradTid = this.state.tid;

				if(uppdateradTid.milisekunder < 1000){
					uppdateradTid.milisekunder += 10;
					this.setState({tid: uppdateradTid });
				}
				else if(uppdateradTid.milisekunder === 1000  && uppdateradTid.sekunder < 60){
					uppdateradTid.milisekunder = 0;
					uppdateradTid.sekunder = ++sekunder;
					this.setState({tid: uppdateradTid});
				}	
				else if(sekunder === 60  && uppdateradTid.minuter < 60){
					uppdateradTid.sekunder = 0;
					uppdateradTid.minuter = ++minuter;
					this.setState({tid: uppdateradTid});
				}
				else if(minuter === 60  && uppdateradTid.timmar < 24){
					uppdateradTid.minuter = 0;
					uppdateradTid.timmar = ++timmar;
					this.setState({tid: uppdateradTid});
				}
				else if(timmar === 24){
					uppdateradTid.timmar = 0;
					this.setState({tid: uppdateradTid});
				}
				this.setState({formateradTid: this.formatera(uppdateradTid.timmar , uppdateradTid.minuter , uppdateradTid.sekunder , uppdateradTid.milisekunder)});
			}.bind(this),10);
		}
		else{
			clearInterval(this.state.clear);
			this.setState({start: true});
			var tid = this.state.tid;
			
			var arr = this.state.tidigareTider; 
			arr.push(this.formatera(tid.timmar , tid.minuter , tid.sekunder , tid.milisekunder));

			this.setState({tidigareTider:arr});

			var aterstael = {
				timmar: 0,
				minuter: 0,
				sekunder: 0,
				milisekunder: 0
			};
			this.setState({tid: aterstael});
		}
	}

	render(){
		var arr = this.state.tidigareTider;
		arr = arr.map(function(ele , index){
			return <TidigareTider key= {index} tid = {ele} />
		});
		var startEllerStop = "";
		var startEllerStopStil = ""
		if(this.state.start){
			startEllerStop = "Start";
			startEllerStopStil = "";
		}
		else{
			startEllerStop = "Stopp";
			startEllerStopStil = "stopp";
		}
		return(
			<div id ="wrapper">
				<div className="startKontainer" onClick= {this.tid.bind(this)}>
					<p className={startEllerStopStil}>{startEllerStop}</p>
				</div>
				<Stoppur tid = {this.state.formateradTid} />
				<ul>
					{arr}
				</ul>
			</div>	
		);
 	}
}

ReactDOM.render(<App /> , document.getElementById("App"));