import React, { Component } from 'react';
import { Header, PlacesList } from '../components';
import { getPlaces, savePlaces } from '../services/placesService.js';

class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			places: getPlaces()
		};
	};
	
	save = (newPlace) => {
		var newPlaces = this.state.places.map(p => p.id === newPlace.id ? newPlace : p);
		savePlaces(newPlaces);
		this.setState({ places: newPlaces });
	};
	
	remove = (removePlace) => {
		var newPlaces = this.state.places.filter(p => p.id !== removePlace.id);
		savePlaces(newPlaces);
		this.setState({ places: newPlaces });
	};
	
	add = (newPlace) => {
		var newPlaces = this.state.places.slice(0);
		newPlaces.push(newPlace);
		savePlaces(newPlaces);
		this.setState({ places: newPlaces });
	}
	
	render = () => {
		return (
			<div>
				<Header add={this.add} />
				<PlacesList places={this.state.places} save={this.save} remove={this.remove}/>
			</div>
		);
	};
}

export default App;