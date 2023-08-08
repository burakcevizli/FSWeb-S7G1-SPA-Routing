import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Film from "./Filmler/Film"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from './Filmler/FilmListesi';

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          console.log(response.data)
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
    console.log("id" , id)
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    if (saved.find((movie) => movie.id == id)) {
      console.log("Bu film zaten kaydedilmiş");
      return;
    } else {
      const movietoAdd = movieList.find((movie) => movie.id == id);
      setSaved([...saved, movietoAdd]);
    }

  }

  return (
    <Router>

      <div>
        <KaydedilenlerListesi list={saved} />
        <Switch>
          <Route path="/" exact><FilmListesi movies={movieList} /> </Route>
          <Route path="/filmler/:id"> <Film kayitEkle = {KaydedilenlerListesineEkle} />  </Route>
          <Route path="filmler"><FilmListesi movies={movieList} /> </Route>
        </Switch>
      </div>
    </Router>
  );
}
