import film_template from '../templates/film.hbs'

const API_KEY =  '170b9b9397b0574b7d603cba918ea1f4';
const URL = 'https://api.themoviedb.org/3'



fetch(`${URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
  .then((data) => data.json())
  .then((res) => {
      console.log(res);
    renderCurrent(res.results)
  });

function renderCurrent(films_list) {
    const localRoot = document.querySelector('.body')
    const localHtml = film_template(films_list)
    console.log(films_list);
    console.log(localRoot);
    localRoot.insertAdjacentHTML('beforeend', localHtml)
}

