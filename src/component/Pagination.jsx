import { useState, useEffect } from "react";
import { useMediaContext } from '../context/MoviesContext.jsx';

function Pagination() {
    const {loading, mode, currentMediaList, selectedMediaType, toggleMediaType, changePage, currentPage, totalPages} = useMediaContext();

    const handlePrev = () => {
        if (currentPage > 1) changePage('prev');
    };

    const handleNext = () => {
        if (currentPage < totalPages) changePage('next');
    };

    const renderPages = () => {
        const pages = [];

        for (let i = 1; i <= (12); i++){    //totalPages
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

        return pages;

    };

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