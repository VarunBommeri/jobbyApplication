import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter, Redirect} from 'react-router-dom'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                alt="website logo"
              />
            </Link>
          </li>

          <Link to="/">
            <li>
              <p>Home</p>
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <p>Jobs</p>
            </li>
          </Link>
        </ul>

        <button type="button" onClick={this.onClickLogout}>
          Logout
        </button>
      </nav>
    )
  }
}

export default withRouter(Header)
