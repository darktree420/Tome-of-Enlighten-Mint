import React, { useState, useRef } from "react";

// Receives: entry, entries, currentPage, updateEntry, handleImageUpload, side ("left" or "right")
export default function PageSpread({
  entry,
  entries,
  currentPage,
  updateEntry,
  handleImageUpload,
  side = "left"
}) {
  const [editing, setEditing] = useState({ field: null, value: "" });
  const fileInput = useRef();

  function startEdit(field) {
    if (!entry) return;
    setEditing({ field, value: entry[field] || "" });
  }

  function finishEdit() {
    if (!entry || !editing.field) {
      setEditing({ field: null, value: "" });
      return;
    }
    updateEntry(currentPage, { [editing.field]: editing.value });
    setEditing({ field: null, value: "" });
  }

  function onFileChange(e) {
    if (!entry) return;
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (handleImageUpload) handleImageUpload(file, currentPage);
  }

  function removeImage() {
    if (!entry) return;
    if (window.confirm("Remove this image from the page? (Cannot be undone)")) {
      updateEntry(currentPage, { image_url: "" });
    }
  }

  if (!entry) {
    return (
      <div style={{ padding: 32, textAlign: "center", color: "#888", fontSize: "1.2em" }}>
        No page loaded.<br />Add a new page to begin, or use the arrows below to navigate.
      </div>
    );
  }

  if (side === "left") {
    // Render Title + Description only
    return (
      <div className="page" style={{ position: "relative", width: "100%", minHeight: 300 }}>
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
              width: "100%"
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
              padding: "2px 4px"
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
              padding: "6px"
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
              minHeight: "60px"
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
    );
  }

  // RIGHT: Only show image upload/preview
  return (
    <div className="page" style={{
      width: "100%",
      minHeight: 300,
      background: "none",
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {entry.image_url ? (
        <div style={{ width: "100%" }}>
          <img
            id="page-image"
            src={entry.image_url}
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
              transition: "box-shadow 0.2s"
            }}
            title="Click to replace image"
            onClick={() => fileInput.current.click()}
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && fileInput.current.click()}
          />
          <button
            title="Remove image"
            style={{
              background: "rgba(40,60,40,0.8)",
              color: "#6f6",
              border: "none",
              borderRadius: 4,
              padding: "2px 8px",
              cursor: "pointer",
              marginTop: 4
            }}
            onClick={removeImage}
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
            marginTop: 24
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
      <input
        type="file"
        ref={fileInput}
        accept="image/*"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </div>
  );
}
