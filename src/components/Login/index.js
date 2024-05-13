import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg: errorMsg, showError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'post',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg, showError} = this.state
    return (
      <form onSubmit={this.onSubmitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
        />
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          onChange={this.onChangeUsername}
          value={username}
          type="text"
          label="USERNAME"
        />
        <label htmlFor="pw">PASSWORD</label>
        <input
          id="pw"
          onChange={this.onChangePassword}
          value={password}
          type="password"
          label="PASSWORD"
        />
        <button type="submit">Login</button>
        {showError && <p>{errorMsg}</p>}
      </form>
    )
  }
}

export default Login
