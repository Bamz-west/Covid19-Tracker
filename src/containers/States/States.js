import React, {Component} from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import ArraySort from 'array-sort';

import './States.css';

import HeadingNames from '../../components/HeadingNames/HeadingNames';
import StateDetails from '../../components/StateDetails/StateDetails';
import Spinner from '../../components/Spinner/Spinner';
import Footer from '../../components/Footer/Footer';


export default class States extends Component {


	state = {
		stateDetails: [],
		searchedStates: []
	}

	async componentDidMount() {
		var stateData = await axios.get("https://covidnigeria.herokuapp.com/api")

		var stateDetails = stateData.data.data.states
		stateDetails = ArraySort(stateDetails, 'confirmedCases', {reverse: true});

		//console.log("states: ",stateDetails)

		this.setState({stateDetails: stateDetails, status: true, selectedData: stateDetails});
	}

	ChangeSortValue = e => {

		const value = e.target.value

		let sortByReverse = true;

		if(value === "Highest") {
			sortByReverse = true;
		} else {
			sortByReverse = false;
		}

		let stateDetails = ArraySort(this.state.stateDetails, 'confirmedCases', {reverse: sortByReverse})

		this.setState({stateDetails: stateDetails, status: true});

	}

	searchState = e => {

		const value = e.target.value

		const stateDetails = this.state.stateDetails

		var FindSpecificState = []

		if(value) {

			stateDetails.map((cur, index) => {

				const finder = cur.state.toLowerCase().search(value.toLowerCase());

				if(finder !== -1) {
					FindSpecificState.push(stateDetails[index])
				}

			})

			FindSpecificState = ArraySort(FindSpecificState, 'confirmedCases', {reverse: true});
			this.setState({searchedStates: FindSpecificState});

		} else {
			this.setState({stateDetails: stateDetails});
		}

		if(value.length === 0) {
			this.setState({selectedData: this.state.stateDetails});
		} else {
			this.setState({selectedData: this.state.searchedStates})
		}

	}


	render() {

		const ChangeNumbertoFormat = (val) => {
			return <NumberFormat
						value={val}
						thousandSeparator={true}
						displayType="text"
					/>
		}

		var stateList = this.state.stateDetails.length > 0 ?

		this.state.selectedData.map((cur, index) => {
			return	<StateDetails
						key={index}
						stateName={cur.state}

						totalCases={ChangeNumbertoFormat(cur.confirmedCases)}

						totalDeaths={ChangeNumbertoFormat(cur.death)}

						totalRecovered={ChangeNumbertoFormat(cur.discharged)}
					/>
		})	: null

		return (

			<div className="states-stats">
				
				<h2 className="states-stats-heading">States Stats</h2>

				<div className="filtering">
					
					<input type="text" placeholder="Enter State Name" onChange={this.searchState} />

					<select className="sort-by" onChange={this.ChangeSortValue}>
						<option>Highest</option>
						<option>Lowest</option>
					</select>
				</div>

				<HeadingNames />

				{this.state.stateDetails.length < 1 ? <Spinner /> : null}
				{stateList}

				<Footer />

			</div>

		)

	}
}