import film_template from '../templates/film.hbs';

const API_KEY = '170b9b9397b0574b7d603cba918ea1f4';
const URL = 'https://api.themoviedb.org/3';

// fetch(`${URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
//   .then(data => data.json())
//   .then(res => {
//     console.log(res);
//     renderCurrent(res.results);
//   });

function renderCurrent(films_list) {
  const localRoot = document.querySelector('.body');
  const localHtml = film_template(films_list);
  console.log(films_list);
  console.log(localRoot);
  localRoot.insertAdjacentHTML('beforeend', localHtml);
}

const getGenres = async () => {
  const genres = await fetch(`${URL}/genre/movie/list?api_key=${API_KEY}`).then(res => res.json())
  return genres.genres;
}

const getNowPlaying = async () => {
  const nowPlaying = await fetch(`${URL}/movie/now_playing?api_key=${API_KEY}`).then(res => res.json())
  return nowPlaying.results;
}

const filterCurrentGenres = async () => {
  const genres = await getGenres();
  const now = await getNowPlaying();

  console.log("genres2 : ", genres);
  console.log("now : ", now);

  const result = now.map(film => {
      // console.log(film.genre_ids);//[]
      const currentGenres = [];

      genres.map(item => {
          // console.log("item : ", item); // {id, name}
          // console.log(film.genre_ids);
          film.genre_ids.map(id => {
              if(item.id === id) {
                  currentGenres.push(item.name);
              }

          })

      });
      // console.log("currentGenres : ", currentGenres);
      return {...film, genresNames: [...currentGenres]}
  });

  console.log("result : ", result);
      renderCurrent(result);
  return result;
}

const test = filterCurrentGenres();

console.log("test : ", test);


setTimeout(() => {

  const items_el_list = {
    img: document.querySelectorAll('.poster_img'),
    hover_box: document.querySelectorAll('.poster_hover_block'),
  }
       console.log(items_el_list)
}, 2000);