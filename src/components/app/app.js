import React, {Component} from 'react';
import './app.css';
import MoviesList from "../movies-list";

class App extends Component {
    render() {
        return (
            <div className="app">
                <MoviesList />
            </div>
        );
    }
}

export default App;
