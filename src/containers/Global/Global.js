import React, {Component} from 'react';
import './Global.css';
import axios from 'axios';
import NumberFormat from 'react-number-format';


import WorldStats from '../../components/WorldStats/WorldStats';


export default class Global extends Component {


	state = {
		result: {
			"TotalConfirmed": 0,
			"TotalDeaths": 0,
			"TotalRecovered": 0,
			"ActiveCases": 0,
			"SamplesTested": 0
		}
	}

	async componentDidMount() {
		var globalData = await axios.get("https://covidnigeria.herokuapp.com/api");

		let corona = globalData.data.data

		console.log("data: ", corona)

		this.setState({
			result: {
				"TotalConfirmed": corona.totalConfirmedCases,
				"TotalDeaths": corona.death,
				"TotalRecovered": corona.discharged,
				"ActiveCases": corona.totalActiveCases,
				"SamplesTested": corona.totalSamplesTested
			}
		})
	}


	render() {

		var Stats = Object.keys(this.state.result).map((key, index) => {
			return <WorldStats 
						key={index}
						about={key}
						// total={this.state.result[key]}
						total={<NumberFormat value={this.state.result[key]} thousandSeparator={true} displayType="text" />}
					/>
		})


		return (

			<div className="Global">
				<h1 className="heading">Covid 19 Tracker</h1>
				<p className="description">Lets check information about Covid-19</p>

				<div className="world-stats">
					
					{Stats}

				</div>
			</div>

		)
	}

}