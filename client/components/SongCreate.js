import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'; //helpers for integrating graphql with apollo library
import { Link } from 'react-router';
import{ hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
		}
	}

	onSubmit(e) {
		e.preventDefault(); //because HTML forms, onSubmit, will try to submit straight to backend
		//and like we want to do a mutation here to submit to backend not just DIRECTLY submit
		this.props.mutate({
			variables: {title: this.state.title},
			refetchQueries: [{ query: query }]
		}).then(() => hashHistory.push('/'))
	}

	render() {
		return (
			<div>
				<Link to="/"> Back </Link>
				<h3> Create a New Song </h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>
						<input
							value={this.state.title}
							onChange={(e) => this.setState({ title: e.target.value })}
							placeholder="Add title here"
						/>
					</label>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSong($title: String){
		addSong(title: $title) {
			title
		}
	}
`;

export default graphql(mutation)(SongCreate);