// импортируем реакт userState
import React, { useState } from "react"
import style from './unsplash.module.css'


const Unsplash = (props) => {
  //переменные для стейтов
  const [active, isActive] = useState(false)
  const [image, image_set] = useState("")
  const [result, set_for_result] = useState([])


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

  //переменная функция для кнопки поиска
  const To_find = () => {
    isActive(!active)
    async_unsplash()
    image_set("")
  };

  //тело
  return (
    <section>
      <div className='container center align_center'>
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

        {/*рандом фото*/}
        <div className={style.div_img_random}>
          <img className={style.img_random} src="https://source.unsplash.com/random" alt="img_random" />
        </div>

        {/*плитка сёрч*/}
        <div className={active ? style.img_tofind_block : [style.img_tofind_block, style.img_tofind_none]}>
          <div className={style.column_gap}>
            {
              result.map((val) => {
                return (
                  <div className={[style.gallery_container]}>
                    <div className={style.gallery_item}>
                      <img
                        key={val.id}
                        className=""
                        src={val.urls.small}
                        alt="val.alt_description"
                      />
                      <div className={style.val_p}>
                        <p className={style.font_gradient}>
                          <b>Автор: </b>{val.user.username}
                          <br />
                          <b>Описание: </b>{val.description}
                          <br /><br />
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Unsplash