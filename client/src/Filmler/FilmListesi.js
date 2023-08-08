import React from 'react';
import { useHistory } from 'react-router-dom/';
import { Link } from 'react-router-dom';
export default function FilmListesi(props) {
  return (
    <div className="movie-list">
      {props.movies.map(movie => (
        <FilmDetayları key={movie.id} movie={movie} />
      ))}
    </div>
  );
  }

function FilmDetayları(props) {
  const { title, director, metascore , id } = props.movie;
  // const history = useHistory()
  // onClick={()=>{                               ONclicke ihtiyacımız kalmadı.
  //   history.push(`/filmler/${id}`)
  // }}
  return (
    <Link to = {`/filmler/${id}`}>
    <div className="movie-card" >
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>
    </Link>
  );
}
