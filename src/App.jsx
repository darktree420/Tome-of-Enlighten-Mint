import React, { useState, useEffect } from "react";
import PageSpread from "./components/PageSpread";  
import BookSpread from "./components/BookSpread";
import Controls from "./components/Controls";
import "./index.css";
import { supabase } from "./supabase";

const BUCKET = "tome-images";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load Tome entries on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from("tomes")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) alert("Could not load tome: " + error.message);
      else setEntries(data || []);
      setLoading(false);
    })();
  }, []);

  // Add a new text entry
  async function addEntry(q = "") {
    const newEntry = {
      question: q,
      answer: "",
      image_url: "",
    };
    const { data, error } = await supabase.from("tomes").insert([newEntry]).select();
    if (error) return alert("Failed to add entry: " + error.message);
    setEntries((old) => [...old, data[0]]);
    setCurrentPage(entries.length);
  }

  // Add a new entry with image (creates row, then uploads image)
  async function addImageEntry(file) {
    const { data: insertData, error: insertError } = await supabase
      .from("tomes")
      .insert([{ question: "Image Entry", answer: "Describe this scene or leave notes here.", image_url: "" }])
      .select();
    if (insertError) return alert("Failed to add entry: " + insertError.message);

    const newEntry = insertData[0];
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase
      .storage
      .from(BUCKET)
      .upload(fileName, file, { upsert: true });
    if (uploadError) return alert("Image upload error: " + uploadError.message);

    const { data: { publicUrl } } = supabase
      .storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    await updateEntry(entries.length, { image_url: publicUrl }, newEntry.id);
  }

  // Update any entry
  async function updateEntry(index, updated, forcedId = null) {
    const entry = forcedId ? entries.find(e => e.id === forcedId) : entries[index];
    if (!entry || !entry.id) return;
    const { error } = await supabase
      .from("tomes")
      .update(updated)
      .eq("id", entry.id);
    if (error) return alert("Failed to update entry: " + error.message);
    setEntries((old) => {
      const copy = [...old];
      const idx = forcedId ? old.findIndex(e => e.id === forcedId) : index;
      if (idx !== -1) copy[idx] = { ...copy[idx], ...updated };
      return copy;
    });
  }

  // Delete entry
  async function deleteEntry(index) {
    const entry = entries[index];
    if (!entry || !entry.id) return;
    if (!window.confirm("Delete this page?")) return;
    const { error } = await supabase.from("tomes").delete().eq("id", entry.id);
    if (error) return alert("Failed to delete entry: " + error.message);
    setEntries((old) => old.filter((_, idx) => idx !== index));
    setCurrentPage((p) => Math.max(0, p - 1));
  }

  // Handle image upload (replace image for existing entry)
  async function handleImageUpload(file, pageIndex) {
    const entry = entries[pageIndex];
    if (!entry || !entry.id) return;
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase
      .storage
      .from(BUCKET)
      .upload(fileName, file, { upsert: true });
    if (error) return alert("Image upload error: " + error.message);
    const { data: { publicUrl } } = supabase
      .storage
      .from(BUCKET)
      .getPublicUrl(fileName);
    await updateEntry(pageIndex, { image_url: publicUrl });
  }

  if (loading) return <div>Loading the Tome of Enlighten-Mint...</div>;

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      <h1 id="tomeHeading">
        {!isOpen ? (
          <>The mysterious tome sits before you, the faint smell of mint hangs in the air. Do you dare to open the tome?</>
        ) : (
          entries.length === 0 || !entries[currentPage]?.question ? (
            <>The blank page awaits a question...</>
          ) : (
            <>This page shows <span style={{ color: "#4fd", fontWeight: 600 }}>{entries[currentPage].question}</span> beautifully illustrated.</>
          )
        )}
      </h1>

      <div id="book-container">
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
          <div id="page-frame">
            {/* Left Side */}
            <div className="book-side left">
              <span className="leafy-frame left"></span>
              <PageSpread
                entry={entries[currentPage]}
                entries={entries}
                currentPage={currentPage}
                updateEntry={updateEntry}
                handleImageUpload={handleImageUpload}
                side="left"
              />
            </div>
            {/* Right Side */}
            <div className="book-side right">
              <span className="leafy-frame right"></span>
              <PageSpread
                entry={entries[currentPage]}
                entries={entries}
                currentPage={currentPage}
                updateEntry={updateEntry}
                handleImageUpload={handleImageUpload}
                side="right"
              />
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <Controls
          entries={entries}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          addEntry={addEntry}
          addImageEntry={addImageEntry}
          deleteEntry={deleteEntry}
        />
      )}
    </div>
  );
}

export default App;
