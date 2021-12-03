import film_template from '../templates/film.hbs';

const API_KEY = '170b9b9397b0574b7d603cba918ea1f4';
const URL = 'https://api.themoviedb.org/3';

// fetch(`${URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
//   .then(data => data.json())
//   .then(res => {
//     console.log(res);
//     renderCurrent(res.results);
//   });

function renderCurrent(films_list, deploy_place) {
  const localRoot = deploy_place;
  const localHtml = film_template(films_list);
  console.log(films_list);
  console.log(localRoot);
  localRoot.insertAdjacentHTML('beforeend', localHtml);
}

const getGenres = async () => {
  const genres = await fetch(`${URL}/genre/movie/list?api_key=${API_KEY}`).then(res => res.json());
  return genres.genres;
};

// const heading = document.createElement('h1');
// console.log(heading); // <h1></h1>

// heading.textContent = 'This is a heading';
// console.log(heading); // <h1>This is a heading</h1>

// heading.innerHTML = '<h1>Привет!</h1>';

const getTopRated = async () => {
  const nowPlaying = await fetch(`${URL}/movie/top_rated?api_key=${API_KEY}`).then(res =>
    res.json(),
  );
  return nowPlaying.results;
};

const getPopular = async () => {
  const nowPlaying = await fetch(`${URL}/movie/popular?api_key=${API_KEY}`).then(res => res.json());
  return nowPlaying.results;
};

const getNowPlaying = async () => {
  const nowPlaying = await fetch(`${URL}/movie/now_playing?api_key=${API_KEY}`).then(res =>
    res.json(),
  );
  return nowPlaying.results;
};

const getUpcomming = async () => {
  const nowPlaying = await fetch(`${URL}/movie/upcoming?api_key=${API_KEY}`).then(res => res.json());
  return nowPlaying.results;
};

const filterCurrentGenres = async (current_option, current_index) => {
  const genres = await getGenres();
  const now = await current_option();

  // console.log('genres2 : ', genres);
  // console.log('now : ', now);

  const result = now.map(film => {
    // console.log(film.genre_ids);//[]
    const currentGenres = [];

    genres.map(item => {
      // console.log("item : ", item); // {id, name}
      // console.log(film.genre_ids);
      film.genre_ids.map(id => {
        if (item.id === id) {
          currentGenres.push(item.name);
        }
      });
    });
    // console.log("currentGenres : ", currentGenres);
    return { ...film, genresNames: [...currentGenres] };
  });

  // console.log('result : ', result);

const names_list = [document.querySelector('.now_playing_list'), document.querySelector('.top_rated_list'), document.querySelector('.popular_list'), document.querySelector('.upcomming_list')]
  renderCurrent(result, names_list[current_index]);
  return 
};

filterCurrentGenres(getTopRated, 1);
filterCurrentGenres(getPopular, 2);
filterCurrentGenres(getNowPlaying, 0);
filterCurrentGenres(getUpcomming  , 3);