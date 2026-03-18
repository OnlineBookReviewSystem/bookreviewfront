import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = `${process.env.REACT_APP_API_URL}/api/reviews`;

function App() {
  const [page, setPage] = useState("create");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    genre: "",
    rating: "",
    reviewText: ""
  });
  // 🔹 Load reviews from backend
  const fetchReviews = () => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Reviews fetched:", data);
        setBooks(data);
      })
      .catch(error => console.error("Error fetching reviews:", error));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredBooks = books.filter(book => 
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.reviewText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 CREATE or UPDATE
  const submitReview = async () => {
    if (!formData.bookTitle || !formData.author) {
      alert("Please fill in book title and author!");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      console.log("Review submitted successfully");
      
      // refresh list
      fetchReviews();

      setFormData({
        bookTitle: "",
        author: "",
        genre: "",
        rating: "",
        reviewText: ""
      });
      setEditId(null);
      setPage("view");
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review: " + error.message);
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
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      console.log("Review deleted successfully");
      setBooks(books.filter((b) => b.id !== id));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review: " + error.message);
    }
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
          <input
            type="text"
            placeholder="Search reviews by title, author, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px"
            }}
          />
          
          <button 
            onClick={fetchReviews}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            🔄 Refresh Reviews
          </button>
          
          {filteredBooks.length === 0 && books.length > 0 && <p>No reviews match your search.</p>}
          {books.length === 0 && <p className="empty">No reviews available</p>}

          {filteredBooks.map((book) => (
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
