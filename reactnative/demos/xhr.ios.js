var xhr = new XMLHttpRequest();
xhr.onreadystatechange = (e) => {
  if (xhr.readyState !== 4) {
    return;
  }
  if (xhr.status === 200) {
    console.log('success', xhr.responseText);
  } else {
    console.warn('error');
  }
};

xhr.open('GET', "https://facebook.github.io/react-native/movies.json");
xhr.send();