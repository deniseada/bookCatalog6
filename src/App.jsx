import { useState, useEffect } from "react";
import Books from "./book";
import "./index.css";
import AddBookForm from "./components/AddBookForm";
import Modal from "./components/Modal";

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const raw = localStorage.getItem("books");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }
    return [];
  });

  const [selectedId, setSelectedId] = useState(null);
  const [authorFilter, setAuthorFilter] = useState("");

  function addBook(book) {
    setBooks((prev) => [book, ...prev]);
  }

  function selectBook(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function deleteSelected() {
    if (!selectedId) return;
    setBooks((prev) => prev.filter((b) => b.id !== selectedId));
    setSelectedId(null);
  }

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    if (!selectedId) return;
    if (!authorFilter) return;
    const selectedBook = books.find((b) => b.id === selectedId);
    if (!selectedBook) return;
    if ((selectedBook.author || "") !== authorFilter) setSelectedId(null);
  }, [authorFilter, books, selectedId]);

  function updateBook(updatedBook) {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
    setSelectedId(null);
  }

  return (
    <div className="container">
      <h1>Book Catalog</h1>
      <div className="actions">
        <div className="filter">
          <label className="filter-label">Filter by author:</label>
          <select
            className="filter-select"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="">All</option>
            {Array.from(new Set(books.map((b) => b.author).filter(Boolean)))
              .sort()
              .map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
          </select>
        </div>
        <div className="bookContainers">
          <div className="newBook">
            <Modal btnLabel="+" btnClassName="btn-plus">
              <AddBookForm add={addBook} />
            </Modal>

            <div className="controls">
              {selectedId ? (
                <Modal btnLabel="Edit" btnClassName="edit">
                  <AddBookForm
                    add={updateBook}
                    book={books.find((b) => b.id === selectedId) || null}
                  />
                </Modal>
              ) : (
                <button className="edit" disabled>
                  Edit
                </button>
              )}

              <button className="delete" onClick={deleteSelected}>
                Delete
              </button>
            </div>
          </div>

          <div className="books">
            {books
              .filter((b) =>
                authorFilter ? (b.author || "") === authorFilter : true
              )
              .map((book) => (
                <Books
                  {...book}
                  key={book.id}
                  isSelected={selectedId === book.id}
                  onSelect={selectBook}
                />
              ))}
          </div>
        </div>
      </div>
      <footer> @ 2025 Denise Aquino</footer>
    </div>
  );
}

export default App;
