import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  const copy = { ...movie };
  delete copy._id;
  if (movie._id !== "new") return http.put(movieUrl(movie._id), copy);
  return http.post(apiEndpoint, copy);
}
