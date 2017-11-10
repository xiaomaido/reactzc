import React from 'react'
import './index.scss'
// import nav_chi from './images/nav_chi.png'
// import nav_chi_active from './images/nav_chi_active.png'
const Index = (props) => {
    const { pathname } = props
    return (
        <ul className="navListBox">
            <li>
                <i className="icon chi" />
                <div>吃</div>
            </li>
            <li>
                <i className="icon chi" />
                <div>住</div>
            </li>
            <li>
                <i className="icon chi" />
                <div>游</div>
            </li>
            <li>
                <i className="icon chi" />
                <div>够</div>
            </li>
            <li>
                <i className="icon chi" />
                <div>我</div>
            </li>
        </ul>
    )
}
export default Index