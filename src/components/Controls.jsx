import React, { useRef } from "react";

export default function Controls({
  entries,
  currentPage,
  setCurrentPage,
  addEntry,
  addImageEntry,
  deleteEntry,
}) {
  const entryInput = useRef();
  const pageImageInput = useRef();

  function prevPage() {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }
  function nextPage() {
    setCurrentPage((prev) => Math.min(entries.length - 1, prev + 1));
  }
  function handleAddEntry() {
    const q = entryInput.current.value.trim();
    if (!q) return;
    addEntry(q);
    entryInput.current.value = "";
  }
  function uploadPageImage() {
    pageImageInput.current.click();
  }
  function onImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    addImageEntry(file);
  }
  function handleDelete() {
    deleteEntry(currentPage);
  }

  return (
    <div id="controls-bar">
      <button onClick={prevPage} disabled={currentPage === 0} title="Previous Page">&lt;</button>
      <button onClick={nextPage} disabled={currentPage >= entries.length - 1} title="Next Page">&gt;</button>
      <textarea
        ref={entryInput}
        placeholder="Ask the Tome a question..."
        style={{ width: 250, height: 50, resize: "none", verticalAlign: "middle" }}
      />
      <button onClick={handleAddEntry} title="Add Text Page">Add</button>
      <button onClick={uploadPageImage}>+ Img</button>
      <input
        ref={pageImageInput}
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        style={{ display: "none" }}
      />
      <button onClick={handleDelete}>Del</button>
    </div>
  );
}
