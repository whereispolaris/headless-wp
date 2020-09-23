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
		// Production
		let dataURL = 'https://disneydidfine.wpengine.com/wp-json/wp/v2/movies?_embed';

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
						<div className='row-1'>
							<h2>{movie.title.rendered}</h2>
							<img
								src={
									movie._embedded['wp:featuredmedia'][0].media_details.sizes
										.full.source_url
								}
								alt={movie.title.rendered}
							/>
						</div>

						<div className='row-2'>
							<p>
								<strong>Release Year:</strong> {movie.acf.release_year}
							</p>
							<p>
								<strong>Rating:</strong> {movie.acf.rating}
							</p>
							<p>
								<strong>Description:</strong>
							</p>
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
				<h2 className='site-title'>Star Wars</h2>
				<h3 className='subheader'>Headless WordPress App</h3>
				<div className='table'>
					<ul className='menu'>
						<li>
							<a
								href='https://github.com/whereispolaris/headless-wp'
								target='_blank'
								rel='noopener noreferrer'
							>
								GitHub Repo
							</a>
						</li>
						<li>
							<a
								href='http://gitmaster.wpengine.com/wp-json'
								target='_blank'
								rel='noopener noreferrer'
							>
								WordPress REST API
							</a>
						</li>
					</ul>
				</div>
				{movies}
			</div>
		);
	}
}
export default App;
