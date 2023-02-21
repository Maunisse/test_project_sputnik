import { React } from "react"
import './header.module.css'
import superstyle from '../../index.css'

const Header = () => (
    <header>
        <div className={`${superstyle.container} ${superstyle.center}`}>
            <div>
                <a href="/"><div>OpenWeather</div></a>
                <a href="/unsplash"><div>Unsplash</div></a>
            </div>
        </div>
    </header>
)
export default Header