import film_template from '../templates/film.hbs';


const API_KEY = '170b9b9397b0574b7d603cba918ea1f4';
const URL = 'https://api.themoviedb.org/3';
const not_found_img = document.getElementById('e-404-img')


function renderCurrent(films_list, deploy_place) {
  const localRoot = deploy_place;
  localRoot.innerHTML = ""
  const localHtml = film_template(films_list);
  localRoot.insertAdjacentHTML('afterbegin', localHtml);
}

const getGenres = async () => {
  const genres = await fetch(`${URL}/genre/movie/list?api_key=${API_KEY}`).then(res => res.json());
  return genres.genres;
};

const filterCurrentGenres = async (current_option, current_index, query) => {
  const genres = await getGenres();
  const now = await current_option(query);

//   console.log('genres2 : ', genres);
//   console.log('now : ', now);

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

  
const names_list = [document.querySelector('.now_playing_list'), document.querySelector('#top_rated'), document.querySelector('.popular_list'), document.querySelector('.upcomming_list'), document.querySelector('#new_films'), document.querySelector('#resoults')]
  if(result.length > 0){
    renderCurrent(result, names_list[current_index]);
    not_found_img.style = "display: none;"
  }
  else{
    let localRoot = document.getElementById("resoults");
    localRoot.innerHTML = ""
    not_found_img.style = "display: block;"
  }
  return 
};

 

  const getNowPlaying = async () => {
    const nowPlaying = await fetch(`${URL}/movie/now_playing?api_key=${API_KEY}`).then(res => 
      res.json()
    );
    return nowPlaying.results;
  };
  const getTopRated = async () => {
    const nowPlaying = await fetch(`${URL}/movie/top_rated?api_key=${API_KEY}`).then(res => 
      res.json()
    );
    return nowPlaying.results;
  };

  filterCurrentGenres(getNowPlaying, 4)
  filterCurrentGenres(getTopRated, 1)


  // ------------------------------Теперь именно функции поиска---------------

  

  const search = async (query) => {
    const res = await fetch(`${URL}/search/multi?api_key=${API_KEY}&query=${query}`).then(res => 
      res.json()
    );
    console.log(res)
    return res.results;
  };

  const searchCall = async () =>{
    let query = document.getElementById('search')
    query = query.value
    resoultsDiv.style = "display: block;"

    
    filterCurrentGenres(search, 5, query)
  }

  const searchImg = document.getElementById('search-img')
  searchImg.onclick = searchCall

  const resoultsDiv = document.getElementById('resoults-heading')


 document.addEventListener('keydown', (event) => {
    if (event.code === "Enter"){
      searchCall()
    }
  })
  

  
  
