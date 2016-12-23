 function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }
   function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => {
      	debugger;
      	return response.json()
      })
      .then((responseJson) => {
      	debugger;
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }