import axios from 'axios';
import React, { Component } from 'react';
class ZipCode extends Component {
	constructor(props) {
		super(props);
		this.state = { Zipcode: 10006, City: 'No results' };
		this.searchCities = this.searchCities.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		this.searchCities();
	}
	searchCities(event) {
		if (event != null) event.preventDefault();
		axios
			.get(`http://ctp-zip-api.herokuapp.com/zip/${this.state.Zipcode}`)
			.then((response) => {
				this.setState({ City: response.data[0].City });
			})
			.catch((error) => {
				this.setState({ City: 'No results' });
			});
	}
	handleChange(event) {
		this.setState({ Zipcode: event.target.value });
	}
	render() {
		return (
			<div>
				<form onSubmit={this.searchCities}>
					<label>
						Enter ZipCode:
						<input type="text" value={this.state.Zipcode} onChange={this.handleChange}></input>
					</label>
					<input type="submit" value="Submit"></input>
				</form>
				<p>This ZipCode is in {this.state.City}</p>
			</div>
		);
	}
}
export default ZipCode;
