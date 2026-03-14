interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 3,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    // Always show first page
    pages.push(1);

    // Calculate visible range around currentPage
    let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 1, start + maxVisible - 1);
    start = Math.max(2, end - maxVisible + 1);

    // Add ellipsis before visible range if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add visible range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis after visible range if needed
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="join">
      {/* Previous arrow */}
      <button
        className="join-item btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        «
      </button>

      {/* Page numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <button
            key={`ellipsis-${index}`}
            className="join-item btn btn-sm btn-disabled"
          >
            …
          </button>
        ) : (
          <button
            key={page}
            className={`join-item btn btn-sm ${
              currentPage === page ? "btn-active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next arrow */}
      <button
        className="join-item btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        »
      </button>
    </div>
  );
}
