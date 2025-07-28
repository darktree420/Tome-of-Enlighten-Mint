import React, { useState } from "react";
import PageSpread from "./components/PageSpread";
import Controls from "./components/Controls";

export default function App() {
  // Demo initial entry for testing
  const [entries, setEntries] = useState([
    {
      question: "What is the Tome of Enlighten-Mint?",
      answer: "A legendary artifact containing all knowledge of dragons, minty freshness, and possibly your next favorite RPG session.",
      image: "",
      date: new Date().toISOString(),
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #1b1f1b, #0d0f0d)",
        color: "#d2f5ce",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <h1 id="tomeHeading" style={{ textAlign: "center", marginBottom: 20 }}>
        The mysterious tome sits before you, the faint smell of mint hangs in the air. Do you dare to open the tome?
      </h1>

      <div
        id="book-container"
        style={{
          position: "relative",
          width: "1150px",
          height: "805px",
          marginBottom: 20,
        }}
      >
        {/* Closed book (landing) */}
        {!isOpen && (
          <div
            id="closed-book"
            onClick={() => setIsOpen(true)}
            title="Open the Tome"
            style={{
              background: "url(/Skins/Minty/closed_book.png) no-repeat center center",
              backgroundSize: "cover",
              width: 640,
              height: 640,
              cursor: "pointer",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              boxShadow: "0 0 40px #3aff80aa",
              borderRadius: 16,
              transition: "box-shadow 0.2s",
            }}
          />
        )}

        {/* Open book (leafy frame, page spread) */}
        {isOpen && (
          <>
            {/* Leafy frame (background) */}
            <div
              id="leafy-frame"
              style={{
                background: "url(/Skins/Minty/leafy_frame.png) no-repeat center center",
                backgroundSize: "cover",
                position: "absolute",
                width: 1150,
                height: 805,
                left: 0,
                top: 0,
                zIndex: 1,
                pointerEvents: "none",
                userSelect: "none",
                filter: "drop-shadow(0 0 60px #3aff80cc)",
                opacity: 0.96,
              }}
            />
            {/* Book open page frame and content */}
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
              <PageSpread
                entry={entries[currentPage]}
                entries={entries}
                setEntries={setEntries}
                currentPage={currentPage}
              />
            </div>
          </>
        )}
      </div>

      {/* Controls bar always under the book when open */}
      {isOpen && (
        <Controls
          entries={entries}
          setEntries={setEntries}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
