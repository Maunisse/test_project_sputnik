import { React } from "react"
import './header.module.css'

const Header = (props) => {
    return (
        <header>
            <div className="container center">
                <div>
                    <a href="/"><div>OpenWeather</div></a>
                    <a href="/unsplash"><div>Unsplash</div></a>
                </div>
            </div>
        </header>
    )
}

export default Header