import React, { Component } from 'react';

class Header extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			title: ''
		};
	};
	
	add = (e) => {
		e.preventDefault();
		const { image } = this.refs;
		
		util.toBase64(image, (filename, data) => {
			this.props.add({
				id: util.uuid(),
				title: this.state.title,
				image: { filename, data }
			});
			this.setState({title: ''});
			image.value = '';
		});
	};
	
	handleChange = (e) => {
		this.setState({ title: e.target.value });
	};
	
	render = () => {
		const { title }  = this.state;
		
		return (
			<header id="header">
				<h1>Places : React</h1>
				<div id="links">
					<a href="../jQuery/index.html">jQuery</a>
					<a href="../angular/index.html">Angular</a>
					<a href="../react/index.html">React</a>
					<a href="../reset.html">RESET</a>
				</div>
				<form>
					<input id="new-title" onChange={this.handleChange} placeholder="Name" value={title} />
					<input id="new-photo" ref="image" type="file" placeholder="Image" accept=".jpg,.png" />
					<button id="add-new" onClick={this.add}>Add to List</button>
				</form>
			</header>
		);
	};
}

export default Header;
