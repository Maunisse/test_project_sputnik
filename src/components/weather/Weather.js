import React, { useEffect, useState } from 'react'
import style from './weather.module.css'
import superstyle from '../../index.css'
import axios from 'axios'

const Weather = () => {
    const [data, setData] = useState({})
    const [data_apod, setData_apod] = useState({})
    const [location, setLocation] = useState('')

    const url_search = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=ru&units=metric&appid=31648dad49367c95342999f2b9feb443`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url_search).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=Tomsk&lang=ru&units=metric&appid=31648dad49367c95342999f2b9feb443`

    const open_weather = () => {
        axios.get(url).then((response) => {
            setData(response.data)
            console.log(response.data)
        })
    }

    const url_apod = `https://api.nasa.gov/planetary/apod?api_key=djcpi5Tv9kl2XGsM9jevZfFHDHyGFEXhPztZrnxo`

    const open_apod = () => {
        axios.get(url_apod).then((response) => {
            setData_apod(response.data)
            console.log(response.data)
        })
    }

    useEffect(() => {

        open_weather()
        open_apod()

        // дата и время
        const hours = document.querySelector('.h')
        const minutes = document.querySelector('.m')
        const seconds = document.querySelector('.s')
        const date = document.querySelector('.date')
        const month = document.querySelector('.month')
        const year = document.querySelector('.year')

        const tick = () => {
            const current = new Date();

            const ss = current.getSeconds()
            const mm = current.getMinutes()
            const hh = current.getHours()
            const d = current.getDate()
            const m = current.getMonth() + 1
            const y = current.getFullYear()

            if (hours || minutes || seconds || date || month || year) {
                hours.textContent = `${hh < 10 ? `0${hh}` : hh}`
                minutes.textContent = `${mm < 10 ? `0${mm}` : mm}`
                seconds.textContent = `${ss < 10 ? `0${ss}` : ss}`
                date.textContent = `${d < 10 ? `0${d}` : d}`
                month.textContent = `${m < 10 ? `0${m}` : m}`
                year.textContent = `${y < 10 ? `0${y}` : y}`
            }
        }
        setInterval(tick, 1000)

        // фоновая картинка в зависимости от времени суток
        const hh = new Date().getHours()
        const fon = document.querySelector('#fon')

        if (hh >= 0 && hh < 6) {
            fon.setAttribute('class', `${style.fon} ${style.fon_1}`)
        }
        if (hh >= 6 && hh < 12) {
            fon.setAttribute('class', `${style.fon} ${style.fon_2}`)
        }
        if (hh >= 12 && hh < 18) {
            fon.setAttribute('class', `${style.fon} ${style.fon_3}`)
        }
        if (hh >= 18 && hh < 24) {
            fon.setAttribute('class', `${style.fon} ${style.fon_4}`)
        }
    }, [])

    //иконка
    const iconurl = "http://openweathermap.org/img/wn/" + data?.weather?.[0]?.icon + "@2x.png"

    return (
        <div id="fon">
            <section>
                <div className={superstyle.container} >
                    <br />
                    <br />
                    <div className={style.weather_block}>
                        <div className={`${superstyle.center} ${superstyle.align_center}`}>
                            <div>
                                <input
                                    value={location}
                                    onChange={event => setLocation(event.target.value)}
                                    onKeyPress={searchLocation}
                                    placeholder='Введите город ...'
                                    type="text" />
                            </div>
                        </div>
                        <div className={style.flex_weather_blocks}>
                            <div>
                                <div className={style.span_date}>
                                    <span className='date'></span><span>.</span><span className='month'></span><span>.</span><span className='year'></span>
                                </div>
                                <span>Томское время:</span>
                                <div className={style.span_time}>
                                    <span className="h"></span><span>:</span><span className="m"></span><span>:</span><span className="s"></span>
                                </div>
                            </div>
                            <div className={`${superstyle.center} ${superstyle.align_center} ${style.icon_block}`}>
                                <img src={iconurl} alt="Weather icon" />
                                <span>{data.weather ? data?.weather?.[0]?.main : null}</span>
                            </div>
                            <div className={style.last_weather_block}>
                                <span className={style.weather_sity}>{data.name}</span>
                                <br /><br />
                                <span className={style.weather_temp}>{data.main ? data.main.temp.toFixed() + '°C' : null}</span>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={style.nasa_block}>
                        <div>
                            <img src={data_apod.url} alt="APOD Nasa" />
                        </div>
                        <div>
                            <h3>{data_apod.title}</h3>
                            <br />
                            <p>{data_apod.explanation}</p>
                        </div>
                    </div>
                </div >
                <br />
            </section >
        </div >
    );
}
export default Weather