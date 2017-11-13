import React from 'react';
import { Link } from 'react-router-dom'


const Categories = ({category}) => {
  return (
    <li className="category-name-link">
      <Link to={`/${category.name}`}>{category.name}</Link>
    </li>
  )
}

export default Categories