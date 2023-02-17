// импортируем реакт userState
import React, { useState, useEffect } from "react"


const Unsplash = () => {
  //переменные для стейтов
  const [image, image_set] = useState("")
  const [result, set_for_result] = useState([])
  const [result_random, set_for_result_random] = useState([])

  //пишем асинхрон для вывода изображений по api
  const async_unsplash = async () => {
    const await_result_img = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${image}&client_id=${"BxHfYJxhN3jlRgdNrv9U9gLrh-IkRJ5TYIhx6eH8KIg"}&per_page=20`
    )
    const await_result_all_img = await await_result_img.json()
    const result_img = await_result_all_img.results
    //через консоль можем глянуть на все параметры json
    console.log(result_img)
    set_for_result(result_img)
  }

  // ставим загрушку [] чтобы поиск не срабатывал на автомате
  useEffect(() => {
    async_unsplash()
  }, [])

  //переменная функция для кнопки поиска
  const To_find = () => {
    async_unsplash()
    image_set("")
  };

  //тело
  return (
    <section>
      <div className="">
        <div className="">
          <div className="">
            <input
              className=""
              type="text"
              placeholder="Поиск..."
              value={image}
              onChange={(e) => image_set(e.target.value)}
            />
            <button
              type="submit"
              onClick={To_find}
              className=""
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <img className="img_random" src="https://source.unsplash.com/random" />
      </div>

      <div className="">
        {result.map((val) => {
          return (
            <>
              <img
                key={val.id}
                className=""
                src={val.urls.small}
                alt="val.alt_description"
              />
              <p>{val.description}</p>
              <p>{val.user.username}</p>
            </>
          )
        })}
      </div>
    </section>
  )
}

export default Unsplash