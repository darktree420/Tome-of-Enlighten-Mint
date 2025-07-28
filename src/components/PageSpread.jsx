import React, { useState, useRef } from "react";

export default function PageSpread({
  entry,
  entries,
  setEntries,
  currentPage,
}) {
  const [editing, setEditing] = useState({ field: null, value: "" });
  const fileInput = useRef();

  // Start editing a field
  function startEdit(field) {
    setEditing({ field, value: entry[field] || "" });
  }

  // Finish editing and update entry
  function finishEdit() {
    if (editing.field) {
      const updatedEntries = [...entries];
      updatedEntries[currentPage][editing.field] = editing.value;
      setEntries(updatedEntries);
    }
    setEditing({ field: null, value: "" });
  }

  // Handle image upload
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updatedEntries = [...entries];
      updatedEntries[currentPage].image = reader.result;
      setEntries(updatedEntries);
    };
    reader.readAsDataURL(file);
  }

  // Remove image
  function removeImage() {
    if (
      window.confirm("Remove this image from the page? (Cannot be undone)")) {
      const updatedEntries = [...entries];
      updatedEntries[currentPage].image = "";
      setEntries(updatedEntries);
    }
  }

  return (
    <div id="page-frame">
      {/* Left page: Title & Description */}
      <div className="page" style={{ position: "relative" }}>
        {/* Editable Title */}
        {editing.field === "question" ? (
          <input
            value={editing.value}
            onChange={e => setEditing({ ...editing, value: e.target.value })}
            onBlur={finishEdit}
            onKeyDown={e => e.key === "Enter" && finishEdit()}
            autoFocus
            style={{
              fontWeight: "bold",
              fontSize: "1.2em",
              marginBottom: 8,
              width: "100%",
            }}
            maxLength={100}
          />
        ) : (
          <div
            id="page-question"
            style={{
              fontWeight: "bold",
              fontSize: "1.2em",
              marginBottom: 8,
              cursor: "pointer",
              transition: "background 0.2s",
              borderRadius: "4px",
              padding: "2px 4px",
            }}
            onClick={() => startEdit("question")}
            title="Click to edit title"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && startEdit("question")}
          >
            {entry?.question || <span style={{ color: "#888" }}>Click to add a title...</span>}
            <span style={{ fontSize: "0.9em", marginLeft: 6, color: "#6f6", verticalAlign: "middle" }}>✏️</span>
          </div>
        )}

        {/* Editable Description */}
        {editing.field === "answer" ? (
          <textarea
            value={editing.value}
            onChange={e => setEditing({ ...editing, value: e.target.value })}
            onBlur={finishEdit}
            rows={6}
            style={{
              fontSize: "1em",
              width: "100%",
              whiteSpace: "pre-wrap",
              marginTop: 3,
              borderRadius: "3px",
              padding: "6px",
            }}
            autoFocus
            maxLength={1000}
          />
        ) : (
          <div
            id="page-prompt"
            style={{
              fontSize: "1em",
              whiteSpace: "pre-wrap",
              cursor: "pointer",
              padding: "2px 4px",
              minHeight: "60px",
            }}
            onClick={() => startEdit("answer")}
            title="Click to edit description"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && startEdit("answer")}
          >
            {entry?.answer || <span style={{ color: "#888" }}>Click to add a description...</span>}
            <span style={{ fontSize: "0.9em", marginLeft: 6, color: "#6f6", verticalAlign: "middle" }}>✏️</span>
          </div>
        )}
      </div>
      {/* Right page: Image */}
      <div
        className="page"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {entry?.image ? (
          <div style={{ position: "relative", width: "100%" }}>
            <img
              id="page-image"
              src={entry.image}
              alt="Tome Illustration"
              style={{
                width: "100%",
                borderRadius: 6,
                boxShadow: "0 0 15px rgba(60,255,130,0.25)",
                marginTop: 8,
                objectFit: "contain",
                maxHeight: 420,
                background: "rgba(0,0,0,0.04)",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
              title="Click to replace image"
              onClick={() => fileInput.current.click()}
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && fileInput.current.click()}
            />
            <button
              onClick={removeImage}
              title="Remove image"
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "rgba(30,0,0,0.65)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                fontSize: "1.1em",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >🗑️</button>
          </div>
        ) : (
          <div
            style={{
              color: "#8f8",
              fontStyle: "italic",
              fontSize: "1em",
              textAlign: "center",
              width: "90%",
              cursor: "pointer",
              marginTop: 24,
            }}
            onClick={() => fileInput.current.click()}
            title="Click to upload image"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && fileInput.current.click()}
          >
            <span style={{ fontSize: "2.1em" }}>+</span> <br />
            Click to add an image!
          </div>
        )}
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInput}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
