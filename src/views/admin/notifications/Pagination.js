import { Button, HStack } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers [1, 2, 3, ... totalPages]
  const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <HStack spacing={2} mt={4} wrap="nowrap" overflowX="auto">
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "solid" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          isActive={page === currentPage}
        >
          {page}
        </Button>
      ))}
    </HStack>
  );
};

export default Pagination;
