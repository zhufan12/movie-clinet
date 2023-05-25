import { useState, useEffect } from 'react'
import api from './api/axiosConfig'
import './App.css'
import { Layout } from './components/layout'
import Home from './components/home/home'
import Header from './components/header/header'
import Reviews from './components/reviews/reviews'
import Trailer from './components/trailer/trailer'
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/notFound/notFound'

function App() {

  const [movies, setMovies] = useState();
  const [moive, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    const response = await api.get("/api/v1/movies").catch(err => {
      console.log(err);
    })
    setMovies(response.data)
  }


  const getMovieData = async (movieId) => {
    const response = await api.get(`/api/v1/movies/${movieId}`).catch((err) => { console.log(err); })

    const sigoneMovie = response.data

    setMovie(sigoneMovie)

    setReviews(sigoneMovie.reviewIds)
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}></Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer></Trailer>}> </Route>
          <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} reviews={reviews
          } setReviews={setReviews} movie={moive} />}> </Route>
          <Route path='*' element={<NotFound/>}> </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
