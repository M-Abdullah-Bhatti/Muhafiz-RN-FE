import { useState } from "react";

const usePagination = (initialPage, initialItemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const calculatePagesToShow = (totalPages, currentPage) => {
    const totalPageNumbersToShow = 5; // Adjust this number as needed
    const halfTotalPageNumbersToShow = Math.floor(totalPageNumbersToShow / 2);

    if (totalPages <= totalPageNumbersToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= halfTotalPageNumbersToShow + 1) {
      return Array.from({ length: totalPageNumbersToShow }, (_, i) => i + 1);
    }

    if (currentPage >= totalPages - halfTotalPageNumbersToShow) {
      return Array.from(
        { length: totalPageNumbersToShow },
        (_, i) => totalPages - totalPageNumbersToShow + i + 1
      );
    }

    return Array.from(
      { length: totalPageNumbersToShow },
      (_, i) => currentPage - halfTotalPageNumbersToShow + i
    );
  };

  const paginate = (data, totalData) => {
    const totalPages = Math.ceil(totalData / itemsPerPage);
    console.log(
      "totalData / itemsPerPage: ",
      totalData,
      itemsPerPage,
      totalPages
    );

    const pageNumbersToShow = calculatePagesToShow(totalPages, currentPage);

    return {
      currentPage,
      totalPages,
      goToPage,
      changeItemsPerPage,
      pageNumbersToShow,
    };
  };

  return paginate;
};

export default usePagination;
