import React from 'react'

const Sortbox = (props) => {
  return (
    <select className="custom-select" value={props.sortBy} onChange={props.handleChange}>
      <option value="" disabled>Sort By:</option>
      <option value="dateASC">Date (newest first)</option>
      <option value="dateDESC">Date (oldest first)</option>
      <option value="scoreASC">Score (highest first)</option>
      <option value="scoreDESC">Score (lowest first)</option>
    </select>
  )
}

export default Sortbox