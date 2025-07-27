import React from "react";
export default function BookFrame({ entries, currentPage }) {
  const entry = entries[currentPage] || {};
  return (
    <div style={{ position: "relative", width: 1150, height: 805 }}>
      <div
        id="leafy-frame"
        style={{
          background: "url(/images/leafy_frame.png) no-repeat center center",
          backgroundSize: "cover",
          position: "absolute",
          width: 1150,
          height: 805,
          left: 0,
          top: 0,
          zIndex: 1,
        }}
      />
      <div
        id="page-frame"
        style={{
          background: "url(/images/open_book.png) no-repeat center center",
          backgroundSize: "contain",
          width: 1000,
          height: 632,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: 20,
          padding: 40,
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <div className="page" style={{ flex: 1 }}>
          <div id="page-question">{entry.question}</div>
          <div id="page-prompt">{entry.answer}</div>
        </div>
        <div className="page" style={{ flex: 1 }}>
          {entry.image && (
            <img
              id="page-image"
              src={entry.image}
              alt="Tome Illustration"
              style={{
                width: "100%",
                borderRadius: 6,
                boxShadow: "0 0 15px rgba(60,255,130,0.2)",
                marginTop: 8,
                objectFit: "contain",
                maxHeight: 420,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
