import axios from 'axios';
import React, { Component } from 'react';
class ZipCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Zipcode: 10006,
			City: 'No results',
			State: '',
			Lat: '',
			Long: '',
			Population: ''
		};
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
				this.setState({
					City: response.data[0].City,
					State: response.data[0].State,
					Lat: response.data[0].Lat,
					Long: response.data[0].Long,
					EstimatedPopulation: response.data[0].EstimatedPopulation,
					TotalWages: response.data[0].TotalWages

				 });
				console.log(response)
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
				<div id = "titleContainer">
				<h1 id = "mainTitle">Zip Code Search</h1>
				</div>
				<form onSubmit={this.searchCities}>
					<div id = "userInput">
					<label>
						Enter ZipCode:
						<input type="text" value={this.state.Zipcode} onChange={this.handleChange}></input>
					</label>
						<input type="submit" value="Submit"></input>
					</div>
				</form>
				<p>This ZipCode is in {this.state.City}</p>
				<p>State: {this.state.State}</p>
				<p>Location: ({this.state.Lat},{this.state.Long})</p>
				<p>Population(estimated): {this.state.EstimatedPopulation}</p>
				<p>Total Wages: {this.state.TotalWages}</p>
			</div>
		);
	}
}
export default ZipCode;
