import React from "react";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Form from "./common/form";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      stock: "",
      rate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    title: Joi.string().min(5).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    stock: Joi.number().min(0).max(99).required().label("Number in Stock"),
    rate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    const { match, history } = this.props;

    try {
      if (match.params.id === "new") return;
      const { data: movie } = await getMovie(match.params.id);
      const { title, genre, numberInStock, dailyRentalRate } = movie;
      const data = {
        title: title,
        genreId: genre._id,
        stock: numberInStock,
        rate: dailyRentalRate,
      };
      this.setState({ data });
    } catch (error) {
      if (error.response && error.response.status === 404)
        history.replace("/not-found");
    }
  }

  async doSubmit() {
    const { title, genreId, stock, rate } = this.state.data;
    const { match, history } = this.props;

    const movie = {
      _id: match.params.id,
      title: title,
      genreId: genreId,
      numberInStock: stock,
      dailyRentalRate: rate,
    };

    try {
      await saveMovie(movie);
    } catch (error) {
      console.log(error);
    }

    history.push("/");
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("stock", "Number in Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
