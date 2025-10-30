function Books({ id, author, image, isSelected, onSelect }) {
  return (
    <div
      className={`book ${isSelected ? "book-bg" : ""}`}
      onClick={() => onSelect && onSelect(id)}
    >
      {image ? <img className="book-image" src={image} /> : null}
      <div className="book-info">
        {author ? <p className="book-author">{`by ${author}`}</p> : null}
      </div>
    </div>
  );
}

export default Books;
