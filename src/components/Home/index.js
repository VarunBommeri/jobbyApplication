import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />

        <h1>Find the Job That Fits Your Life</h1>
        <p>Millions of people are searching for jobs</p>
        <Link to="/jobs">
          <button>Find Jobs</button>
        </Link>
      </div>
    )
  }
}

export default Home
