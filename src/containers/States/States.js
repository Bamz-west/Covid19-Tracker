import React, {Component} from 'react';
import axios from 'axios';

import './States.css';

import HeadingNames from '../../components/HeadingNames/HeadingNames';
import StateDetails from '../../components/StateDetails/StateDetails';


export default class States extends Component {


	state = {
		stateDetails: [],
		searchedStates: []
	}

	async componentDidMount() {
		var stateData = await axios.get("https://covidnigeria.herokuapp.com/api")

		var stateDetails = stateData.data.data.states

		console.log("states: ",stateDetails)

		this.setState({stateDetails: stateDetails, status: true, selectedData: stateDetails})
	}


	render() {

		var stateList = this.state.stateDetails.length > 0 ?
		this.state.selectedData.map((cur, index) => {
			return	<StateDetails
						stateName="IN"

						totalCases="344,321"
						newCases="32,332"

						totalDeaths="34,989"
						newDeaths="2,343"

						totalRecovered="341,000"
						newRecovered="2,890"
					/>
		})	: null

		return (

			<div className="states-stats">
				
				<h2 className="states-stats-heading">States Stats</h2>

				<div className="filtering">
					
					<input type="text" placeholder="Enter State Name" name="" id="" />
					<select className="sort-by" name="" id="">
						<option value="">Highest</option>
						<option value="">Lowest</option>
					</select>
				</div>

				<HeadingNames />

				{stateList}

			</div>

		)

	}
}