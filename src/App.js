import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {startDate: '', endDate: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		// capture the event target
		const target = event.target;
		// get the name of the element that triggered the event
		const name = target.name;
		// set the state (sort of vue-like data-binding) ;)
		this.setState({
			[name]: event.target.value
		});
	}

	handleSubmit(event) {

		//prevent form form being submitted to the server (no backend)
		event.preventDefault();	
		event.nativeEvent.stopImmediatePropagation();
		event.stopPropagation();
		
		// check input, if a field is not supplied alert the user
		if (!this.state.startDate || !this.state.endDate) {
			alert('Please make sure that both start date and end date fields are provided !');
		// else data is supplied, proceed to validation
		} else {
			// validate the first date
			if (!this.validDate(this.state.startDate)) {
				alert('Start date is invalid')
			}
			//validate the second date
			else if (!this.validDate(this.state.endDate)) {
				alert('End date is invalid')
				
			}
			else {
				// now that both dates are valid, convert dd/MM/YY to standard format
				var dateOne = this.dateFromDMY(this.state.startDate).getTime();
				var dateTwo = this.dateFromDMY(this.state.endDate).getTime();
				
				// calculate the absolute value of the difference
				var daysDiff = this.millisToDays(Math.abs(dateTwo - dateOne));
				
				// print the date to the screen
				alert('There are ' + daysDiff + ' day(s) between start and end date !');
			}
		}
		
	}

	/**
	 * takes a 'DD/MM/YY' date string and converts it 
	 * to a js Date object
	 * @param {String} date 
	 */
	dateFromDMY(date) {
		var mems = date.split("/");
		return new Date(
			parseInt(mems[2], 10),
			parseInt(mems[1], 10) - 1,
			parseInt(mems[0], 10),
		);
	}
	
	/**
	 * convenience helper method to validate a date 
	 * using a regex
	 * @param {String} date 
	 */
	validDate(date) {

		/**
		 * first part matches any twenties combination or 30, 31 values
		 * next months from 01 to 09, 10, 11 or 12
		 * and finally any combination of 4 digits
		 *  */ 
		var reg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
		return date.match(reg);
	}

	/**
	 * given a number of millis, convert to days equivalent
	 * @param {Number} millis 
	 */
	millisToDays(millis) {
		return Math.floor(millis / (1000*60*60*24));
	}


	render() {
		return (
			<div className="App">
				<div className="ui one column stackable center aligned page grid">
   					<div className="column twelve wide">
						<div className="ui piled segment">
							<h1 className="ui dividing header">NimbleWaysApp</h1>
							<form className="ui form" onSubmit={this.handleSubmit}>
								<div className="field">
									<label className="floated">Start date</label>
									<input name="startDate" type="text" value={ this.state.startDate } onChange={this.handleChange}/>
								</div>
								<div className="field">
									<label className="floated">End date</label>
									<input name="endDate" type="text" value={ this.state.endDate } onChange={this.handleChange}/>
								</div>
								<button className="ui button" type="submit">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
