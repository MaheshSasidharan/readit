import React from 'react';

export class Topic extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		const children = this.props.children;
		console.log(children);
		return (
			<div>
			<h3>{this.props.match.params.topicId}</h3>
			</div>
			);
	}
};