import React, { Component } from 'react';
import { Place } from './';

class PlacesList extends Component {
	
    render = () => {
		return (
			<ul id="todo-list">
				{this.props.places.map(p =>
					<Place key={p.id} {...p} {...this.props} />)}
			</ul>
		);	
	};
}

export default PlacesList;
