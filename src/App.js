import './App.css'
import React from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/header/Header'
import Unsplash from './components/unsplash/Unsplash'
import Weather from './components/weather/Weather'

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Weather />}></Route>
          <Route path='/unsplash' element={<Unsplash />}></Route>
        </Routes>
      </ BrowserRouter>
    </>
  )
}
export default App
