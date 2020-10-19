import React, { Component } from 'react';
import query from '../queries/fetchOneSong';
import { graphql } from 'react-apollo'; //helpers for integrating graphql with apollo library;
import { Link } from 'react-router';
import LyricList from './LyricList';
import LyricCreate from './LyricCreate';


class SongDetail extends Component {
	render() {
		const { song } = this.props.data;
		if (!song) {
			return <div> Loading </div>
		}
		return (
			<div>
				<Link to='/'> Back </Link>
				<h3> {song.title} </h3>
				<LyricList
					songLyrics={song.lyrics}
				/>
				<LyricCreate
					id={song.id}
				/>
			</div>
		);
	}
}

export default graphql(query, {
	options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);