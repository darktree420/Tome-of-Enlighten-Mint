import React, { useState, useEffect } from "react";
import PageSpread from "./components/PageSpread";
import Controls from "./components/Controls";
import "./index.css";
import { db, storage } from "./firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from 'browser-image-compression';

const TOME_DOC = "main"; // Name of your tome document in Firestore

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Real-time sync from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "tomes", TOME_DOC), (docSnap) => {
      if (docSnap.exists()) setEntries(docSnap.data().entries || []);
      else setEntries([]);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Save to Firestore on change (except while loading initial data)
  useEffect(() => {
    if (!loading) {
      setDoc(doc(db, "tomes", TOME_DOC), { entries }, { merge: true });
    }
  }, [entries, loading]);

  // Image upload handler for PageSpread
  async function handleImageUpload(file, pageIndex) {
    const compressed = await imageCompression(file, { maxWidthOrHeight: 800, maxSizeMB: 0.3 });
    const imgRef = ref(storage, `tome-images/${file.name}-${Date.now()}`);
    await uploadBytes(imgRef, compressed);
    const url = await getDownloadURL(imgRef);

    // Update entry's image URL
    setEntries((old) => {
      const copy = [...old];
      copy[pageIndex] = { ...copy[pageIndex], image: url };
      return copy;
    });
  }

  // Book leafy frame style
  const leafyFrameStyle = {
    background: "url(/Tome-of-Enlighten-Mint/Skins/Minty/leafy_frame.png) no-repeat center center",
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

  if (loading) return <div>Loading the Tome of Enlighten-Mint...</div>;

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
              background: "url(/Tome-of-Enlighten-Mint/Skins/Minty/closed_book.png) no-repeat center center",
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
            <div
              id="page-frame"
              style={{
                background: "url(/Tome-of-Enlighten-Mint/Skins/Minty/open_book.png) no-repeat center center",
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
                handleImageUpload={handleImageUpload}
              />
            </div>
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
