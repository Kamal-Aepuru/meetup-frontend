import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import Header from "./components/Header";
import { useState, useMemo, useCallback } from "react";

const EventCard = ({ event }) => (
  <div key={event._id} className="col-md-4 py-2">
    <div
      className="card border-0 bg-light"
      style={{ width: "18rem", height: "auto" }}
    >
      <Link
        to={`/events/${event._id}`}
        className="text-decoration-none text-reset"
      >
        <img
          className="card-img-top img-fluid event-image"
          alt="Event Cover"
          src={event.coverImageUrl}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <div className="card-img-overlay">
          <button className="btn btn-light">{event.type} Event</button>
        </div>
      </Link>
      <Link
        to={`/events/${event._id}`}
        className="text-decoration-none text-reset"
      >
        <p className="text-secondary">
          {new Date(event.startDate).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          •{" "}
          {event.startTime
            ? new Date(`${event.startDate} ${event.startTime}`).toLocaleTimeString(
                "en-US",
                { hour: "numeric", minute: "numeric", hour12: true }
              )
            : "N/A"}{" "}
          IST
        </p>
        <h5>{event.name}</h5>
      </Link>
    </div>
  </div>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const { data: events, loading, error } = useFetch(
    "https://meetup-backend-indol.vercel.app/events"
  );
  if (error) console.error("Failed to fetch events:", error);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const handleSelect = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return events.filter((event) => {
      const matchesSearch =
        !searchTerm ||
        event.name.toLowerCase().includes(searchTerm) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
      const matchesType = !selectedType || event.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [events, searchTerm, selectedType]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="bg-light py-1">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h1>MeetUp Events</h1>
            <select className="form-select" onChange={handleSelect}>
              <option value="">Select Event Type</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="container row">
            {loading ? (
              <p>Loading...</p>
            ) : filteredEvents.length === 0 ? (
              <p>No Results Found</p>
            ) : (
              filteredEvents.map((event) => <EventCard key={event._id} event={event} />)
            )}
          </div>
        </div>
      </main>
    </>
  );
}
