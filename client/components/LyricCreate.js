import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
	constructor(props) {
		super(props)
		
		this.state={
			lyricLine: ''
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.mutate({
			variables: {
				lyric: this.state.lyricLine,
				id: this.props.id
			}
		}).then(this.setState({ lyricLine: '' }));
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<label> Add a Lyric </label>
				<input
					value={this.state.lyricLine}
					onChange={(e) => this.setState({ lyricLine: e.target.value })}
				/>
			</form>

		);
	}
}

const mutation = gql`
	mutation AddLyric($lyric: String, $id: ID) {
		addLyricToSong(content: $lyric, songId: $id) {
			id
			title
			lyrics {
				id
				content
				likes
			}
		}
	}
`

export default graphql(mutation)(LyricCreate);