import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {
  const [searchFilteredEvents, setSearchFilteredEvents] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFilteredEvents, setSelectedFilteredEvents] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);

  const { data, loading, error } = useFetch(
    "https://meetup-backend-indol.vercel.app/events",
  );
  if (error) console.error("Failed to fetch events:", error);

  const filterByTerm = (term) => {
    if (!data) return [];
    return data.filter(
      (meetUp) =>
        meetUp.name.toLowerCase().includes(term) ||
        meetUp.tags.some((tag) => tag.toLowerCase().includes(term)),
    );
  };

  const handleSearch = (term) => {
    setHasSearched(true);
    const filteredEvents = filterByTerm(term.toLowerCase());
    setSearchFilteredEvents(filteredEvents);
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    if (value === "") {
      setHasSelected(false);
      setSelectedFilteredEvents([]);
      return;
    }
    setHasSelected(true);
    if (data) {
      const filterTypeEvents = data.filter((event) => event.type === value);
      setSelectedFilteredEvents(filterTypeEvents);
    }
  };

  let eventsToDisplay = [];
  if (hasSearched && searchFilteredEvents.length > 0) {
    eventsToDisplay = searchFilteredEvents;
  } else if (hasSelected && selectedFilteredEvents.length > 0) {
    eventsToDisplay = selectedFilteredEvents;
  } else if (data && data.length > 0) {
    eventsToDisplay = data;
  }

  const formatDateRange = (date, time) => {
    const optionsDate = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(date).toLocaleDateString(
      "en-US",
      optionsDate,
    );
    const formattedTime = time
      ? new Date(`${date} ${time}`).toLocaleTimeString("en-US", optionsTime)
      : "N/A";

    return `${formattedDate} • ${formattedTime} IST`;
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="bg-light py-1">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1>MeetUp Events</h1>
            </div>
            <div>
              <select className="form-select" onChange={handleSelect}>
                <option value="">Select Event Type</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="container row">
            {loading ? (
              <p>Loading...</p>
            ) : (hasSearched && searchFilteredEvents.length === 0) ||
              (hasSelected && selectedFilteredEvents.length === 0) ? (
              <p>No Results Found</p>
            ) : (
              eventsToDisplay.map((event) => (
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
                        <button className="btn btn-light">
                          {event.type} Event
                        </button>
                      </div>
                    </Link>

                    <Link
                      to={`/events/${event._id}`}
                      className="text-decoration-none text-reset"
                    >
                      <p className="text-secondary">
                        {formatDateRange(event.startDate, event.startTime)}
                      </p>
                      <h5>{event.name}</h5>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
