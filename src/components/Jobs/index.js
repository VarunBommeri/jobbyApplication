import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Job from '../Job'
import NoJobs from '../NoJobs'
import ProfileView from '../FailureView'
import Profile from '../Profile'
import Header from '../Header'
import SalaryRange from '../SalaryRange'
import EmploymentType from '../EmploymentType'


const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    isLoading: true,
    total: 0,
    failureView: false,
    search: '',
    employment_type: '',
    minimum_package: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    console.log(this.state)
    const jwtToken = Cookies.get('jwt_token')
    const {employment_type, search, minimum_package} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employment_type}&minimum_package=${minimum_package}&search=${search}`
    const options = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log('vasw')
    console.log(response)
    if (response.ok === true) {
      const jobs = data.jobs
      const total = data.total

      this.setState({jobsList: jobs, total: total, isLoading: false})
    } else {
      this.setState({failureView: true})
    }
  }

  onChangeSearchInput = event => {
    this.setState(prevState => ({...prevState, search: event.target.value}))
  }

  onClickSearchButton = () => {
    this.getJobs()
  }

  onChangeSalary = salaryId => {
    this.setState(
      prevState => ({...prevState, minimum_package: salaryId}),
      this.getJobs,
    )
  }

  onChangeEmploymentType = employmentList => {
    const empLisLength = employmentList.length
    const empLis = employmentList.slice(1, empLisLength)
    const joinedEmpList = empLis.join(',')
    this.setState(
      prevState => ({...prevState, employment_type: joinedEmpList}),
      this.getJobs,
    )
  }

  handlingRetry = () => {
    this.getJobs()
  }

  renderJobs = () => {
    const {jobsList, failureView, searchInput, search} = this.state

    return (
      <div>
        {jobsList.length === 0 ? (
          <NoJobs />
        ) : (
          <ul>
            {jobsList.map(each => (
              <Job job={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
  render() {
    const {isLoading, failureView} = this.state
    console.log(failureView)
    return (
      <div>
        <Header />
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(each => (
            <EmploymentType
              onChangeEmploymentType={this.onChangeEmploymentType}
              employmentType={each}
              key={each.employmentTypeId}
            />
          ))}
        </ul>

        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(each => (
            <SalaryRange
              onChangeSalary={this.onChangeSalary}
              salaryRange={each}
              key={each.salaryRangeId}
            />
          ))}
        </ul>

        <label htmlFor="searchId"></label>
        <input
          id="searchId"
          type="search"
          onChange={this.onChangeSearchInput}
        />
        <button
          onClick={this.onClickSearchButton}
          type="button"
          data-testid="searchButton"
        >
          <img src="" alt="search icon" />
        </button>

        <Profile />
        {failureView ? (
          <ProfileView handlingRetry={this.handlingRetry} />
        ) : isLoading ? (
          <div data-testid="loader">
            <Loader />
          </div>
        ) : (
          this.renderJobs()
        )}
      </div>
    )
  }
}

export default Jobs
