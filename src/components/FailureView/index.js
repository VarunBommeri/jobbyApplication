const ProfileView = props => {
  const {handlingRetry} = props
  const onClickRetry = () => {
    handlingRetry()
  }
  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <div>
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={onClickRetry}>Retry</button>
      </div>
    </div>
  )
}
export default ProfileView
