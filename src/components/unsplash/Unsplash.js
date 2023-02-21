// импортируем реакт userState
import React, { useState } from "react"
import style from './unsplash.module.css'
import superstyle from '../../index.css'


const Unsplash = () => {
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

  // правило для поиска через Enter
  const open_enter = (e) => {
    if (e.key === 'Enter') {
      async_unsplash()
      isActive(true)
    }
  }

  //переменная функция для кнопки поиска c условиями
  const To_find = () => {
    async_unsplash()
    // если что-то введено, то тогда выдаем список
    if (image == 0) {
      isActive(false)
    } else {
      isActive(true)
    }
    image_set("")
  };

  //тело
  return (
    <div className={style.fon_unsplash}>
      <section>
        <div className={`${superstyle.container} ${superstyle.center} ${superstyle.align_center}`}>
          <div className="">
            <input
              className=""
              type="text"
              placeholder="Поиск..."
              value={image}
              onChange={(e) => image_set(e.target.value)}
              onKeyPress={open_enter}
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

          {/*плитка сёрч
          делаем блок видимым, когда нажмем кнопку*/}
          <div className={active ? style.img_tofind_block : `${style.img_tofind_block} ${style.img_tofind_none}`}>
            <div className={style.column_gap}>
              {
                result.map((val, key) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={style.gallery_container} key={key}>
                      <div className={style.gallery_item}>
                        <img
                          className=""
                          src={val.urls.small}
                          alt="val.alt_description"
                        />
                        <div className={style.val_p}>
                          <p className={style.font_gradient}>
                            <b>Автор: </b>{val.user.username}
                            <br />
                            <b>Описание: </b>{val.description}
                            <br />
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <br />
          </div>
        </div>
        <br />
        <br />
      </section>
    </div>
  )
}

export default Unsplash