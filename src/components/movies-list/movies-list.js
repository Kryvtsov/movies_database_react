import React, {Component} from 'react';
import './styles/main.scss';
import SwapiService from "../../services/swapi-service";
import ReactPaginate from 'react-paginate';
import MovieSelected from "../movie-selected";

class MoviesList extends Component {
    state = {
        movieList: null,
        page: 1,
        pageCount: null,
        overview: null,
        movieSelected: false,
        id: null
    };
    swapi = new SwapiService();
    total_pages;

    loadMoviesFromServer() {
        const {page} = this.state;
        this.swapi.getPopularMovies(page)
            .then((movieList) => {
                this.setState({
                    movieList
                })
            })
    };
    loadTotalPages() {
        this.swapi.getTotalPages()
            .then((res) => {
                this.setState({
                    pageCount: res.total_pages
                })
            });
    }
    selectMovie = (id) => {
        this.setState({
            id,
            movieSelected: true
        })
    };
    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page:  selected + 1
        }, () => this.loadMoviesFromServer());
    };

     renderMovies= (arr) => {
        return arr.map((movie) => {
            const {rating, poster, title, id} = movie;
            return (
                <div className='movie'
                     key={id}
                     onClick = { () => this.selectMovie(id) }
                    >
                    <div className='poster'>
                        <span className='rating'>Rating: {rating}</span>
                        <img src={poster} alt={title}/>
                    </div>
                    <span className='title'>{title}</span>
                </div>
            )
        })
    };
    componentDidMount() {
        this.loadTotalPages();
        this.loadMoviesFromServer();
    }
    render() {
        const {movieList, movieSelected, id} = this.state;
        if (!movieList) return <div>Loading...</div>;
        if (movieSelected) return (
            <div className='content'>
                <MovieSelected id = {id} />
            </div>
        );
        return (
            <div className='content'>
                {this.renderMovies(movieList)}
                <ReactPaginate previousLabel={"<<"}
                               nextLabel={">>"}
                               breakLabel={"..."}
                               breakClassName={"break-me"}
                               pageCount={this.state.pageCount}
                               marginPagesDisplayed={1}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
            </div>
        )

    };
}
export default MoviesList;


