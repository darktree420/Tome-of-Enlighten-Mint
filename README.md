# Tome-of-Enlighten-Mint
A visually interative book that allows for adding images as pages or potentially AI driven responces
# 📖 Tome of Enlighten-Mint

A magical, interactive, browser-based lorebook tool for tabletop RPGs.

The Tome of Enlighten-Mint is a living journal designed for DMs and players to record, display, and preserve campaign lore in a stylish, immersive format. It features page-flipping UI, local and exportable data, and plans for future enhancements like image support and thematic skins.

---

## ✨ Features

- 🌿 Add and store custom page entries
- 📂 Save/Load tome entries via browser localStorage
- 📤 Export full tomes as `.json` files for sharing
- 📥 Import `.json` tomes to continue previous campaigns or load premade content
- ⌨️ Navigate pages using ← / → arrow keys
- 🧙‍♂️ Lightweight, no server required

---

## 🛠️ Getting Started

### Option 1: Run Locally

1. Clone the repo or download the `index.html` file.
2. Open the file in any modern browser (Chrome, Firefox, Edge).
3. Start adding entries and flipping through your magical tome.

### Option 2: Host Online (Recommended)

Use [GitHub Pages](https://pages.github.com/) or [Netlify](https://netlify.com/) to deploy your tome for persistent access and sharing.

---

## 🔄 Import/Export Format

Entries are stored as an array of JSON objects like:

```json
{
  "question": "Who built the fortress?",
  "answer": "The Emberforged dwarves of old...",
  "date": "2025-07-23T18:42:00.000Z"
}
