import _ from "lodash";

export function paginate(items, currentPage, pageSize) {
  const startIndex = pageSize * (currentPage - 1);
  return _(items).slice(startIndex).take(pageSize).value();
}

// Refactored from following in render() method:
//
// moviesArray.filter(
//     (m) =>
//       moviesArray.indexOf(m) >= pageSize * (currentPage - 1) &&
//       moviesArray.indexOf(m) < pageSize * currentPage
//   )
