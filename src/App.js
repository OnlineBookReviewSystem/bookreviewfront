import React, { useEffect, useState } from "react";
import "./App.css";
 manashamin-patch-1
const API_URL = "http://localhost:8080/api/reviews";


const API_URL = `${process.env.REACT_APP_API_URL}/api/reviews`;

main
function App() {
  const [page, setPage] = useState("create");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    genre: "",
    rating: "",
    reviewText: ""
  });
  // 🔹 Load reviews from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 CREATE or UPDATE
  const submitReview = async () => {
    if (!formData.bookTitle || !formData.author) return;

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    // refresh list
    const res = await fetch(API_URL);
    setBooks(await res.json());

    setFormData({
      bookTitle: "",
      author: "",
      genre: "",
      rating: "",
      reviewText: ""
    });
    setEditId(null);
    setPage("view");
  };

  // 🔹 EDIT
  const editBook = (book) => {
    setFormData(book);
    setEditId(book.id);
    setPage("create");
  };

  // 🔹 DELETE
  const deleteBook = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div className="container">
      <h1>📚 BookNest</h1>

      <div className="nav">
        <button onClick={() => setPage("create")}>Create Review</button>
        <button onClick={() => setPage("view")}>View Reviews</button>
      </div>

      {page === "create" && (
        <div className="form">
          <h2>{editId ? "Edit Review" : "Create Review"}</h2>

          <input
            name="bookTitle"
            placeholder="Book Title"
            value={formData.bookTitle}
            onChange={handleChange}
          />

          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
          />

          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="">Select Genre</option>
            <option>Comics</option>
            <option>Romance</option>
            <option>Fantasy</option>
            <option>Thriller</option>
            <option>Self-Help</option>
          </select>

          <input
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
          />

          <textarea
            name="reviewText"
            placeholder="Write review..."
            value={formData.reviewText}
            onChange={handleChange}
          />

          <button onClick={submitReview}>
            {editId ? "Update Review" : "Add Review"}
          </button>
        </div>
      )}

      {page === "view" && (
        <div className="list">
          {books.length === 0 && <p className="empty">No reviews available</p>}

          {books.map((book) => (
            <div className="card" key={book.id}>
              <h3>{book.bookTitle}</h3>
              <p><b>Author:</b> {book.author}</p>
              <p><b>Genre:</b> {book.genre}</p>
              <p><b>Rating:</b> ⭐ {book.rating}</p>
              <p className="review">{book.reviewText}</p>

              <div className="actions">
                <button className="edit" onClick={() => editBook(book)}>Edit</button>
                <button className="delete" onClick={() => deleteBook(book.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
