import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = `${process.env.REACT_APP_API_URL}/api/reviews`;

function App() {
  const [page, setPage] = useState("create");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    genre: "",
    rating: 0,
    reviewText: ""
  });

  // 🔹 Load reviews
  const fetchReviews = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ⭐ STAR CLICK
  const handleStarClick = (value) => {
    setFormData({ ...formData, rating: value });
  };

  // 🔹 CREATE / UPDATE
  const submitReview = async () => {
    if (!formData.bookTitle || !formData.author) {
      alert("Please fill in book title and author!");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      fetchReviews();

      setFormData({
        bookTitle: "",
        author: "",
        genre: "",
        rating: 0,
        reviewText: ""
      });

      setEditId(null);
      setPage("view");
    } catch (err) {
      console.error(err);
    }
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

          {/* ⭐ STAR RATING */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= formData.rating ? "star filled" : "star"}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>

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

              {/* ⭐ SHOW STARS */}
              <p>
                <b>Rating:</b>{" "}
                {[1,2,3,4,5].map((i) => (
                  <span key={i} className={i <= book.rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </p>

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
