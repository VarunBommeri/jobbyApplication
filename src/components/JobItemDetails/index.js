import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobDetailsFailureView from '../JobDetailsFailureView'
const SimilarJob = props => {
  const {similarJob} = props

  const {
    company_logo_url,
    employment_type,
    id,
    job_description,
    location,
    rating,
    title,
  } = similarJob   

  return (
    <div>
      <div>
        <img src={company_logo_url} alt='similar job company logo' />
        <h1>{title}</h1>
        <p>{rating}</p>
      </div>
      <h1>Description</h1>
      <p>{job_description}</p>
      <p>{employment_type}</p>
      <p>{location}</p>
    </div>
  )
}
class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
    failureView: false,
  }

  componentDidMount() {
    this.renderJobDetails()
  }

  renderJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'get',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedData

      const {life_at_company, skills} = jobDetails

      this.setState({
        jobItemDetails: jobDetails,
        similarJobs: similarJobs,
        lifeAtCompany: life_at_company,
        skills: skills,
      })
    } else {
      this.setState({failureView: true})
    }
  }

  renderJobDetailsInfo = () => {
    console.log('jb info cld')
    const {jobItemDetails, similarJobs, lifeAtCompany, skills} = this.state
    const {description, image_url} = lifeAtCompany
    console.log(skills)
    const {
      title,
      employment_type,
      company_logo_url,
      rating,
      job_description,
      company_website_url,
      id,
      location,
      package_per_annum,
    } = jobItemDetails

    return (
      <div>
        <Header />
        <div>
          <img src={company_logo_url} alt='job details company logo' />
          <h1>{title}</h1>
          <p>{rating}</p>
          <p>{location}</p>
          <h1>Description</h1>
          <p>{job_description}</p>
          <div>
            <h1>Skills</h1>
            <ul>
              {skills.map(each => {
                return (
                  <li key={each.name}>
                    <img src={each.image_url} alt={each.name} />
                    <p>{each.name}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <h1>Job Details</h1>
          <p>{employment_type}</p>

          <p>{package_per_annum}</p>
        </div>

        <div>
          <h1>Life at Company</h1>
          <img src={image_url} />
          <p>{description}</p>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(each => (
              <SimilarJob similarJob={each} key={each.id} />
            ))}
          </ul>
        </div>
        <a href={company_website_url}>Visit</a>
      </div>
    )
  }

  handlingRetry = () => {
    this.renderJobDetails()
  }

  render() {
    const {jobItemDetails, similarJobs, failureView} = this.state
    const {id} = jobItemDetails

    return (
      <div>
        {failureView ? (
          <JobDetailsFailureView handlingRetry={this.handlingRetry} />
        ) : (
          this.renderJobDetailsInfo()
        )}
      </div>
    )
  }
}

export default JobItemDetails
