import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../components/Header";

const EventDetails = () => {
  const { eventId } = useParams();
  const {
    data: selectedEvent,
    loading,
    error,
  } = useFetch(
    `https://meetup-backend-indol.vercel.app/events/${eventId}`,
  );

  const formatDateRange = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching event details.</p>;
  if (!selectedEvent) return <p>No Event Found</p>;

  return (
    <>
      <Header />

      <main className="bg-light">
        <div className="container">
          <div className="row">
            <div
              className="d-flex justify-content-between align-items-start gap-5 flex-column flex-md-row"
              style={{ gap: "4rem" }}
            >
              <div className="col-md-6 py-3">
                <h2>{selectedEvent.name}</h2>
                <p>
                  Hosted By:
                  <br />
                  <strong>{selectedEvent.hostedBy}</strong>
                </p>

                <img
                  src={selectedEvent.coverImageUrl}
                  className="img-fluid rounded"
                  alt="Event Cover"
                  style={{ width: "25rem", height: "auto" }}
                />

                <div className="mt-4">
                  <h3>Details:</h3>
                  <p>{selectedEvent.details}</p>
                </div>

                {selectedEvent.additionalInformation && (
                  <div className="mt-4">
                    <h3>Additional Information:</h3>
                    {selectedEvent.additionalInformation.dressCode && (
                      <p>
                        <strong>Dress code:</strong>{" "}
                        {selectedEvent.additionalInformation.dressCode}
                      </p>
                    )}
                    {selectedEvent.additionalInformation.ageRestrictions && (
                      <p>
                        <strong>Age Restrictions:</strong>{" "}
                        {selectedEvent.additionalInformation.ageRestrictions}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <h3>Event Tags:</h3>
                  <div className="py-1">
                    {selectedEvent.tags.map((tag, index) => (
                      <button className="btn btn-danger pl-3 mx-1" key={index}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6 py-2">
                <div className="py-3">
                  <div className="card" style={{ width: "25rem" }}>
                    <div className="card-body">
                      <div className="d-flex align-items-center py-2">
                        <svg
                          className="bi bi-clock"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>
                        <p className="mb-0 mx-2">
                          {`${formatDateRange(selectedEvent.startDate)} ${selectedEvent.startTime} to`}{" "}
                          {`${formatDateRange(selectedEvent.endDate)} ${selectedEvent.endTime}`}
                        </p>
                      </div>
                      <div className="d-flex align-items-center py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-geo-alt"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <p className="mb-0 mx-2">
                          {selectedEvent.location.venue},{" "}
                          {selectedEvent.location.address},{" "}
                          {selectedEvent.location.city},{" "}
                          {selectedEvent.location.country}
                        </p>
                      </div>
                      <div className="d-flex align-items-center py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-currency-rupee"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                        </svg>
                        <p className="mb-0 mx-2">
                          {selectedEvent.eventCost > 0
                            ? `${selectedEvent.eventCost} INR`
                            : "Free"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3">
                  <h3>Speakers: ({selectedEvent.speakers.length})</h3>
                  <div className="d-flex align-items-center py-2">
                    {selectedEvent.speakers.map((speaker, index) => (
                      <div
                        className={`card ${index !== 0 ? "ms-3" : ""}`}
                        key={index}
                      >
                        <div className="card-body text-center">
                          <img
                            className="img-fluid rounded-circle"
                            src={speaker.imageUrl}
                            alt={speaker.name}
                            style={{
                              objectFit: "cover",
                              height: "100px",
                              width: "5rem",
                            }}
                          />
                          <h4>{speaker.name}</h4>
                          <p>{speaker.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="py-2 mx-5">
                    <button
                      className="btn btn-danger"
                      style={{ width: "15rem" }}
                    >
                      RSVP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventDetails;
