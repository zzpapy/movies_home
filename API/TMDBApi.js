// API/TMDBApi.js

const API_TOKEN = "1209c73f14597cc45c91696c34a854c7";

export function getFilmsFromApiWithSearchedText (text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text+ "&page=" + page
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }
  export function getFilmDetail (id) {
    const url = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+API_TOKEN+"&language=fr-FR&append_to_response=credits"
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }

  export function getImageFromApi (name) {
    if(name !== null){
      return 'https://image.tmdb.org/t/p/w300' + name

    }
    else return '../Images/cine.jpg'
  }

  export function getActor(id){
    
    const url = "https://api.themoviedb.org/3/person/"+id+"?api_key="+API_TOKEN+"&append_to_response=movie_credits"
    return fetch(url)
        .then(res => res.json())
        .catch(er => console.error(er))
  }


  export function getActorByName(name,page){
    
    const url = "https://api.themoviedb.org/3/search/person?query="+name+"&api_key="+API_TOKEN+"&page="+page+"&include_adult=false"
    return fetch(url)
        .then(res => res.json())
        .catch(er => console.error(er))
  }

  export function getNow(page){
    const url = "https://api.themoviedb.org/3/movie/now_playing?sort_by=primary_release_date.desc&api_key="+API_TOKEN+"&language=fr-FR&page="+page+"&region=FR"
    return fetch(url)
        .then(res => res.json())
        .catch(er => console.error(er))
  }





  



  