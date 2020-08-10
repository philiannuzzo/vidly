import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listgroup";
import SearchBar from "./common/searchBar";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    currentGenre: -1,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    moviesLoaded: false,
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: genres } = await getGenres();
    this.setState({ moviesLoaded: true, movies, genres });
  }

  componentDidUpdate() {
    const { movies, currentPage, pageSize, moviesLoaded } = this.state;

    if (moviesLoaded) {
      const maxPage = Math.ceil(movies.length / pageSize);
      if (maxPage < currentPage) {
        this.setState({ currentPage: maxPage });
      }
    }
  }

  renderMoviesCount(count) {
    if (count > 1)
      return <span>There are {count} movies in the database.</span>;
    else if (count === 1) return <span>There is 1 movie in the database.</span>;
    return <span>There are no movies in the database.</span>;
  }

  renderNewMovieButton() {
    const { user, history } = this.props;

    if (user)
      return (
        <button
          className="btn btn-primary"
          onClick={() => history.push("/movies/new")}
        >
          New Movie
        </button>
      );
  }

  getPagedData() {
    let {
      movies,
      genres,
      currentPage,
      pageSize,
      currentGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filteredMovies = [...movies];
    if (currentGenre > -1)
      filteredMovies = movies.filter(
        (movie) => movie.genre._id === genres[currentGenre]._id
      );
    else if (searchQuery)
      filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order] // asc or desc
    );

    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);

    return {
      filteredCount: filteredMovies.length,
      paginatedMovies: paginatedMovies,
    };
  }

  handleDelete = async (movieId) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movieId);
    this.setState({ movies });

    try {
      await deleteMovie(movieId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Movie already deleted.");
        this.setState({ movies: originalMovies });
      }
    }
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGroupChange = (genre) => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      currentGenre: -1,
      currentPage: 1,
      searchQuery: query,
    });
  };

  render() {
    const {
      movies,
      genres,
      currentPage,
      pageSize,
      currentGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    const moviesCount = movies.length;
    const { filteredCount, paginatedMovies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            groups={genres}
            currentGroup={currentGenre}
            onGroupChange={this.handleGroupChange}
            allText="Genres"
          />
        </div>
        <div className="col">
          <p>{this.renderNewMovieButton()}</p>
          <p>{this.renderMoviesCount(moviesCount)}</p>
          <SearchBar searchQuery={searchQuery} onSearch={this.handleSearch} />
          <MoviesTable
            movies={paginatedMovies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            user={this.props.user}
          />
          <Pagination
            numPages={Math.ceil(filteredCount / pageSize)}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
