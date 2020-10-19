import React, { Component } from 'react';
import gql from 'graphql-tag'; //this imports gql that helps us write queries in js
import { graphql } from 'react-apollo'; //glue layer between react and apollo layer
import { Link } from 'react-router'; //generates anchor tag
import query from '../queries/fetchSongs';

class SongList extends Component {

	songDelete(id) {
		this.props.mutate({ variables: { songId: id }})
			.then(this.props.data.refetch());
	}


	renderSongs() {
		return this.props.data.songs.map(({ id, title }) => {
			return (
				<li key={id} className="collection-item">
					<Link to={`songs/${id}`}>{title}</Link>
					<i
						className="material-icons"
						onClick={() => this.songDelete(id)}
					>
						delete
					</i>
				</li>
			)
		});
	};

	render() {
		if (this.props.data.loading) {
			return <div> Loading </div>
		}
		return (
			<div>
				<ul className="collection">
					{this.renderSongs()}
				</ul>
				<Link
					to="/songs/new"
					className="btn-floating btn-large red right"
				>
					<i className="material-icons"> add </i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteSong($songId: ID) {
		deleteSong(id: $songId) {
		  id
		}
	}
`;

export default graphql(mutation)(
	graphql(query)(SongList)
);
//graphql(query) returns a function
//second set of parantheses on SongList calls the function
//when our component rendered, query that we wrote will automatically be 
//sent to the backend server, when query complete, the component will be
//rerendered.