import React from 'react';


import './StateDetails.css';


const StateDetails = (props) => {
	return (

		<div className="stateDetails">
			
			<div className="state-name">
				{props.stateName}
			</div>

			<div className="cases-details">

				<div className="cases-box Cases">
					<a href="http://covid19.ncdc.gov.ng/" target="_blank" rel="noreferrer">{props.totalCases}</a>
					{/* <p className="yesterday">Last 24 Hours: <strong>{props.newCases}</strong></p> */}
				</div>

				<div className="cases-box Deaths">
					<a href="http://covid19.ncdc.gov.ng/" target="_blank" rel="noreferrer">{props.totalDeaths}</a>
					{/* <p className="yesterday">Last 24 Hours: <strong>{props.newDeaths}</strong></p> */}
				</div>

				<div className="cases-box Recovered">
					<a href="http://covid19.ncdc.gov.ng/" target="_blank" rel="noreferrer">{props.totalRecovered}</a>
					{/* <p className="yesterday">Last 24 Hours: <strong>{props.newRecovered}</strong></p> */}
				</div>

			</div>
		</div>

	)
}


export default StateDetails;