import React, { useState } from "react";
import PageSpread from "./components/PageSpread";
import Controls from "./components/Controls";
import BookCover from "./components/BookCover";
import BookFrame from "./components/BookFrame";
import "./index.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState(
    () => JSON.parse(localStorage.getItem("tomeEntries") || "[]")
  );
  const [currentPage, setCurrentPage] = useState(0);

  // Auto-save to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("tomeEntries", JSON.stringify(entries));
  }, [entries]);

  // Show leafy frame background
  const leafyFrameStyle = {
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
    display: isOpen ? "block" : "none"
  };

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      <h1 id="tomeHeading">
        The mysterious tome sits before you, the faint smell of mint hangs in the air. Do you dare to open the tome?
      </h1>
      <div id="book-container" style={{ position: "relative", width: 1150, height: 805 }}>
        {!isOpen && (
          <div
            id="closed-book"
            onClick={() => setIsOpen(true)}
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
            }}
            title="Open the Tome"
          />
        )}
        {isOpen && (
          <>
            <div id="leafy-frame" style={leafyFrameStyle} />
            <PageSpread entry={entries[currentPage]} />

      
          </>
        )}
      </div>
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

export default App;
