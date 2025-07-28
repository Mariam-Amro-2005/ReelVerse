import { useState, useEffect } from "react";
import { useMediaContext } from '../context/MoviesContext.jsx';

function Pagination() {
    const { changePage, currentPage, setCurrentPage, totalPages} = useMediaContext();

    const handlePrev = () => {
        if (currentPage > 1) changePage('prev');
    };

    const handleNext = () => {
        if (currentPage < totalPages) changePage('next');
    };

    const MAX_VISIBLE_PAGES = 8;

    const renderPages = () => {
        const pages = [];

        const half = Math.floor(MAX_VISIBLE_PAGES / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (end - start + 1 < MAX_VISIBLE_PAGES) {
            if (start === 1) {
                end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
            } else if (end === totalPages) {
                start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
            }
        }

        if (start > 1) {
            pages.push(
                <button key={1} onClick={() => setCurrentPage(1)}>
                    1
                </button>
            );
            if (start > 2) {
                pages.push(<span key="start-ellipsis" className="ellipsis">...</span>);
            }
        }

        for (let i = start; i <= (end); i++){    //totalPages
            pages.push(
                <button
                    key={i}
                    className={`page-btn ${i === currentPage ? "active" : ""}`}
                    onClick={() => (
                        setCurrentPage(i))}
                >
                    {i}
                </button>
            );
        }

        if (end < totalPages) {
            if (end < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className="ellipsis">...</span>);
            }
            pages.push(
                <button key={totalPages} onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        // return pages;
        return pages;

    };

    useEffect(() => {
        renderPages();
    },[currentPage]);

    return (
    <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
            &laquo;
        </button>
        {renderPages()}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
            &raquo;
        </button>
    </div>
    );
}

export default Pagination;