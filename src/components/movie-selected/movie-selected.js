import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import './index.scss'


class MovieSelected extends Component {
    state = {
        movie: null,
    };
    swapi = new SwapiService();

    loadSelectedMovie = (id) => {
        this.swapi.getSelectedMovie(id)
            .then((movie) => {
                this.setState({
                    movie
                })
            })
    };
    componentDidMount() {
        const {id} = this.props;
        this.loadSelectedMovie(id);
    }
    render() {
        const {movie} = this.state;
        if (!movie) return <div>Loading...</div>;
        const {vote_average, title, poster_path, overview, original_title, release_date, popularity} = movie;

        return (
            <div className='content'>
                <div className='movie'>
                    <div className='poster'>
                        <span className='rating'>Rating: {vote_average}</span>
                        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title}/>
                    </div>
                    <span className='title'>{title}</span>
                </div>
                <div className='overview'>
                    <ul>
                        <li><span>Original title:</span> {original_title}</li>
                        <li><span>Release date:</span> {release_date}</li>
                        <li><span>Popularity:</span> {popularity}</li>
                        <li><span>Overview:</span><br/><br/>{overview}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MovieSelected;