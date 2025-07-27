import React from "react";

export default function PageSpread({ entry }) {
  return (
    <div
      id="page-frame"
      style={{
        background: "url(/Skins/Minty/open_book.png) no-repeat center center",
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
      {/* Left page: prompt/question */}
      <div className="page" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div id="page-question" style={{ fontWeight: "bold", fontSize: "1.2em", marginBottom: 8 }}>
          {entry?.question || ""}
        </div>
        <div id="page-prompt" style={{ fontSize: "1em", whiteSpace: "pre-wrap" }}>
          {entry?.answer || ""}
        </div>
      </div>
      {/* Right page: image */}
      <div className="page" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {entry?.image ? (
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
        ) : (
          <span style={{ color: "#88b", fontStyle: "italic" }}>
            {/* Placeholder if no image */}
            The Tome awaits an image...
          </span>
        )}
      </div>
    </div>
  );
}
