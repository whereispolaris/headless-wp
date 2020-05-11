import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
		};
	}

	componentDidMount() {
		let dataURL = 'https://gitmaster.wpengine.com/wp-json/wp/v2/movies?_embed';
		fetch(dataURL)
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					movies: res,
				});
			});
	}
	render() {
		let movies = this.state.movies.map((movie, index) => {
			return (
				<div key={index}>
					<div className='container'>
						<div className='movie-poster'>
							<h2>
								<strong>Title:</strong> {movie.title.rendered}
							</h2>
							<img
								src={
									movie._embedded['wp:featuredmedia'][0].media_details.sizes
										.full.source_url
								}
								alt={movie.title.rendered}
							/>
						</div>

						<div className='description'>
							<p>
								<strong>Release Year:</strong> {movie.acf.release_year}
							</p>
							<p>
								<strong>Rating:</strong> {movie.acf.rating}
							</p>
							<strong>Description:</strong>
							<div
								dangerouslySetInnerHTML={{ __html: movie.acf.description }}
							/>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div>
				<h2 className='site-title'>
					Star Wars Movies | Headless WordPress App
				</h2>

				{movies}
			</div>
		);
	}
}
export default App;
