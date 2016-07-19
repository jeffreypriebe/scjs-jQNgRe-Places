import React, { Component } from 'react';
import classnames from 'classnames';

class Place extends Component {

	constructor(props) {
		super(props);

		const { title, image } = this.props;

		this.state = {
			title,
			image,
			editing: false
		};
	};

	componentDidMount = () => {
		this.refs.item.addEventListener('keydown', this.handleKeys, false);
	};
	
	get place() {
		const { image, title } = this.state;
		const { id } = this.props
		return {
			id,
			title,
			image
		};
	};

	edit = () => {
		this.setState({ editing: !this.state.editing });
	};

	handleKeys = (e) => {
		if (e.key === 'Escape') {
			this.setState({ editing: false });
		} else if (e.key === 'Enter') {
			//save
			this.setState({ editing: false });
			this.props.save(this.place);
		}
	};
	
	remove = (e) => {
		this.props.remove(this.place);
	};
	
	type = (e) => {
		this.setState({ title: e.target.value });
	};

	render = () => {
		const { image, title } = this.state;

		const itemClasses = classnames({
			'editing': this.state.editing
		});

		return (
			<li className={itemClasses} ref="item">
				<img alt={image.filename} src={image.data} />
				<a href="#" className="remove" onClick={this.remove}>x</a>
				<span className="title view" onClick={this.edit}>{title}</span>
				<input
					className="edit"
					value={title}
					ref={(i) => { if (i !== null && this.state.editing) { i.focus(); } } }
					onChange={this.type}
					/>
			</li>
		);
	}
}

export default Place;