import React from "react";
export default function BookCover({ onOpen }) {
  return (
    <div
      id="closed-book"
      onClick={onOpen}
      title="Open the Tome"
      style={{
        background: "url(/images/closed_book.png) no-repeat center center",
        backgroundSize: "cover",
        width: 640,
        height: 640,
        cursor: "pointer",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
