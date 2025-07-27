import React, { useRef } from "react";

export default function Controls({
  entries,
  setEntries,
  currentPage,
  setCurrentPage,
}) {
  const entryInput = useRef();
  const pageImageInput = useRef();

  function prevPage() {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }
  function nextPage() {
    setCurrentPage((prev) => Math.min(entries.length - 1, prev + 1));
  }
  function addEntry() {
    const q = entryInput.current.value.trim();
    if (!q) return;
    setEntries((prev) => [
      ...prev,
      { question: q, answer: "", image: "", date: new Date().toISOString() },
    ]);
    setCurrentPage(entries.length);
    entryInput.current.value = "";
  }
  function uploadPageImage() {
    pageImageInput.current.click();
  }
  function onImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setEntries((prev) => [
        ...prev,
        {
          question: "Image Entry",
          answer: "Describe this scene or leave notes here.",
          image: dataUrl,
          date: new Date().toISOString(),
        },
      ]);
      setCurrentPage(entries.length);
    };
    reader.readAsDataURL(file);
  }
  function deleteCurrentPage() {
    if (!entries.length) return;
    if (!window.confirm("Delete this page?")) return;
    const newEntries = entries.slice();
    newEntries.splice(currentPage, 1);
    setEntries(newEntries);
    setCurrentPage((p) => Math.max(0, p - 1));
  }
  function saveTome() {
    localStorage.setItem("tomeEntries", JSON.stringify(entries));
    alert("Tome saved locally.");
  }
  function loadTome() {
    const loaded = JSON.parse(localStorage.getItem("tomeEntries") || "[]");
    setEntries(loaded);
    setCurrentPage(0);
  }
  function exportTome() {
    const data = JSON.stringify(entries, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tome_of_enlightenmint.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function importTome(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const loaded = JSON.parse(reader.result);
        setEntries(loaded);
        setCurrentPage(0);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }
  function generateAIImage() {
    const prompt = entryInput.current.value.trim();
    if (!prompt) return alert("Enter a prompt first!");
    // Placeholder: Replace with AI image generation integration
    const fakeImage = "https://placekitten.com/500/350";
    setEntries((prev) => [
      ...prev,
      {
        question: prompt,
        answer: "",
        image: fakeImage,
        date: new Date().toISOString(),
      },
    ]);
    setCurrentPage(entries.length);
    entryInput.current.value = "";
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
      <button onClick={addEntry} title="Add Text Page">Add</button>
      <button onClick={generateAIImage} title="Generate Image with AI">AI Image</button>
      <button onClick={saveTome}>Save</button>
      <button onClick={loadTome}>Load</button>
      <button onClick={exportTome}>Export</button>
      <label>
        Import
        <input type="file" accept="application/json" onChange={importTome} style={{ display: "none" }} />
      </label>
      <button onClick={uploadPageImage}>+ Img</button>
      <input
        ref={pageImageInput}
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        style={{ display: "none" }}
      />
      <button onClick={deleteCurrentPage}>Del</button>
    </div>
  );
}
