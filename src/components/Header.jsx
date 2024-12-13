import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";

const Header = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const handleInput = (event) => {
    const { value } = event.target;
    setInput(value);
    onSearch(value);
  };
  return (
    <>
      <header className="bg-light py-3">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between border-bottom border-3">
            <div>
              <Link to="/">
                <img
                  className="img-fluid"
                  src={
                    "https://asd-ntrelationships.com/wp-content/uploads/2020/04/meetup-reg-button-300x119.png"
                  }
                  alt="meetup-image"
                  style={{ maxWidth: "150px" }}
                />
              </Link>
            </div>
            <div>
              <div className="input-group rounded">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search by title and tag"
                  value={input}
                  onChange={handleInput}
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <span class="input-group-text border-0" id="search-addon">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
