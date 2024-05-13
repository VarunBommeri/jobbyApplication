import {Link} from 'react-router-dom'
const Job = props => {
  const {job} = props

  const updatedJob = {
    companyLogoUrl: job.company_logo_url,

    employmentType: job.employment_type,
    id: job.id,
    description: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  }

  const {
    companyLogoUrl,
    employmentType,
    description,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = updatedJob

  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <img src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
        <h1>Description</h1>
        <p>{description}</p>
        <p>{location}</p>
        <p>{packagePerAnnum}</p>
        <p>{employmentType}</p>
      </li>
    </Link>
  )
}

export default Job
