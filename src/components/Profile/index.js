import {Component} from 'react'
import Cookies from 'js-cookie'
import Job from '../Job'
import Loader from 'react-loader-spinner'
class Profile extends Component {
  state = {profileDetails: {}, profileView: false, isLoading: true}
  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)

    if (response.ok === true) {
      const {profile_details} = data
      this.setState({profileDetails: profile_details, isLoading: false})
    } else {
      this.setState({profileView: true})
    }
  }

  onClickRetry = () => {
    this.getProfile()
  }

  render() {
    const {profileDetails, profileView, isLoading} = this.state
    const {profile_image_url, name, short_bio} = profileDetails

    return (
      <div>
        {profileView ? (
          <button onClick={this.onClickRetry}>Retry</button>
        ) : isLoading ? (
          <div data-testid='loader'>
            <Loader />
          </div>
        ) : (
          <div>
            <img src={profile_image_url} alt='profile' />
            <h1>{name}</h1>
            <p>{short_bio}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Profile
