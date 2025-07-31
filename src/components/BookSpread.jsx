import React from "react";


export default function BookSpread({ children }) {
  return (
  <div className="book.glow">
    <div className="bookspread-outer">
      <div className="bookspread-inner">
        <img
          src="/Skins/Minty/open_book_left.png"
          alt="Left page"
          className="bookspread-img left"
          draggable={false}
        />
        <img
          src="/Skins/Minty/open_book_right.png"
          alt="Right page"
          className="bookspread-img right"
          draggable={false}
        />
        {/* Overlay the children (the rest of your UI) */}
        <div className="bookspread-content">
          {children}
        </div>
      </div>
    </div>
</div>
  );
}
