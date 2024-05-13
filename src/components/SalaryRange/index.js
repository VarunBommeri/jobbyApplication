const SalaryRange = props => {
  const {salaryRange, onChangeSalary} = props
  const {salaryRangeId, label} = salaryRange
  const onChangeSalaryRange = () => {
    onChangeSalary(salaryRangeId)
  }
  return (
    <li>
      <label htmlFor="check"></label>
      <input
        type="radio"
        id="check"
        name="employment type"
        onChange={onChangeSalaryRange}
      />
      <p>{label}</p>
    </li>
  )
}
export default SalaryRange
