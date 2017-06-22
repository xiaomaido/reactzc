import React, { Component } from 'react'
import { Link } from 'react-router'
export default class Repo extends Component {
    render() {
        const { repo, owner } = this.props
        const { login } = owner
        const { name, description } = repo
        return (
          <li className="Repo">
            <h3>
              <Link to={`/${login}/${name}`}>
                {name}
              </Link>
              {' by '}
              <Link to={`/${login}`}>
                {login}
              </Link>
            </h3>
            { description && <p>{description}</p> }
          </li>
        )
    }
}