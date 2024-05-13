import {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
class ProtectedRoute extends Component {
  render() {
    const props = this.props
    console.log(props)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    } else {
      return <Route {...props} />
    }
  }
}

export default ProtectedRoute
