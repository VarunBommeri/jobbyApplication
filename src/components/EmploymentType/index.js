import {Component} from 'react'

let employmentTypesList
let filteredEmpList
let empTypesList
class EmploymentType extends Component {
  state = {checked: false, empList: []}

  sendEmpLis = () => {
    console.log('sendempcld')
    const {onChangeEmploymentType} = this.props
    const {empList} = this.state
    onChangeEmploymentType(empList)
  }

  getEmploymentTypesList = () => {
    const {empList} = this.state
    const {employmentType, onChangeEmploymentType} = this.props
    const {employmentTypeId} = employmentType

    const {checked} = this.state

    if (checked) {
      employmentTypesList = employmentTypesList + ' ' + employmentTypeId

      empTypesList = employmentTypesList.split(' ')
    } else {
      empTypesList = empTypesList.filter(each => each !== employmentTypeId)
      employmentTypesList = empTypesList.join(' ')
    }

    this.setState({checked: checked, empList: empTypesList}, this.sendEmpLis)
  }
  onChangeEmploymentTypes = () => {
    const {checked} = this.state
    this.setState(
      prevState => ({checked: !prevState.checked}),
      this.getEmploymentTypesList,
    )
  }
  render() {
    const {employmentType, onChangeEmploymentType} = this.props
    const {employmentTypeId, label} = employmentType
    const {checked, empList} = this.state

    return (
      <div>
        <li>
          <label htmlFor="check"></label>
          <input
            onChange={this.onChangeEmploymentTypes}
            type="checkbox"
            id="check"
          />
          <p>{label}</p>
        </li>
      </div>
    )
  }
}

export default EmploymentType
