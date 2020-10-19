import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {

	onLike(songId, likes) {
		this.props.mutate({
			variables: {
				id: songId
			},
			optimisticResponse: {
				__typename: 'Mutation',
				likeLyric: {
					id: songId,
					__typename: 'LyricType',
					likes: likes + 1
				}
			}
		})
	}

	renderLyrics() {
		return this.props.songLyrics.map((lyric) => {
			return (
				<li key={lyric.id} className="collection-item">
					{lyric.content}
					<div className="vote-box">
						<i
							className="material-icons"
							onClick={() => this.onLike(lyric.id, lyric.likes)}
						>
							thumb_up
						</i>
						{lyric.likes}
					</div>	
				</li>
			)
		})

	}

	render() {
		return (
			<ul className="collection">
				{this.renderLyrics()}
			</ul>
		);
	}
}

const mutation = gql`
	mutation LikeLyric($id: ID) {
		likeLyric(id: $id) {
			id
			likes
			song {
				id
			}
		}
	}
`

export default graphql(mutation)(LyricList);