import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ numPages, currentPage, onPageChange }) => {
  if (numPages === 1) return null;
  const liArray = [];
  for (let i = 0; i < numPages; i++) {
    const className = "page-item" + (i + 1 === currentPage ? " active" : "");
    liArray.push(
      <li className={className} key={i}>
        <a className="page-link" onClick={() => onPageChange(i + 1)}>
          {i + 1}
        </a>
      </li>
    );
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{liArray}</ul>
    </nav>
  );
};

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
