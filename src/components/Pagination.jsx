import { useState } from "react";
import React from "react";

export default function Pagination({ totalItems, itemsPerpage, currentPage, setCurrentPage }) {
    const totalPages = Math.cell(totalItems / itemsPerpage);
    const handleClick = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="pagination">
            {Array.from({length: totalPages}, (_, pageId) => (
                <button 
                    key = {pageId + 1}
                    onClick={() => handleClick(page + 1)}
                    className={currentPage === pageId + 1 ? "active" : ""}
                >
                    {pageId + 1}
                </button>
            ))}
        </div>
    )
}

