export default class SwapiService {
    _apiBase = 'https://api.themoviedb.org/3/movie/';
    _apiKey = 'f260170a65522e5006559539ef75a2c2';
    _imgBase = 'https://image.tmdb.org/t/p/w500';

    getResourse = async(url, page) => {
        const res = await fetch(`${this._apiBase}${url}?api_key=${this._apiKey}&page=${page}`);
        if(!res.ok) {
            throw new Error(`Couldnt fetch ${url}` +
                `, recieved ${res.status}`);
        }
        return await res.json();
    };


    getPopularMovies = async(page) => {
        const res = await this.getResourse(`popular`, page);
        return res.results.map(this._transformMovie)
    };
    getTotalPages = async() => {
        return await this.getResourse(`popular`, 1);
    };
    getSelectedMovie = async(id) => {
        const res = await this.getResourse(id, 1);
        console.log(res)
        return res
    };

    _transformMovie = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            poster: `${this._imgBase}${movie.poster_path}`,
            rating: movie.vote_average,
            overview: movie.overview
        }
    }
}