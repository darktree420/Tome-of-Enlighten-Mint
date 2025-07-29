import React from "react";
import PageSpread from "./PageSpread";

export default function BookSpread({ entries, currentPage, ...props }) {
  // Defensive: show nothing if no entries
  if (!entries.length) return null;

  // Left and right pages for desktop; mobile will stack
  const leftEntry = entries[currentPage] || null;
  const rightEntry = entries[currentPage + 1] || null;

  return (
    <div className="book-spread">
      <div className="book-page book-page-left">
        <img
          src="/Skins/Minty/leafy_frame_left.png"
          className="page-frame"
          alt=""
          draggable={false}
        />
        <img
          src="/Skins/Minty/open_book_left.png"
          className="page-bg"
          alt=""
          draggable={false}
        />
        <PageSpread entry={leftEntry} side="left" {...props} />
      </div>
      <div className="book-page book-page-right">
        <img
          src="/Skins/Minty/leafy_frame_right.png"
          className="page-frame"
          alt=""
          draggable={false}
        />
        <img
          src="/Skins/Minty/open_book_right.png"
          className="page-bg"
          alt=""
          draggable={false}
        />
        <PageSpread entry={rightEntry} side="right" {...props} />
      </div>
    </div>
  );
}
