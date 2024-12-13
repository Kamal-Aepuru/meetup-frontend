import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"
import EventDetails from "./pages/EventDetails"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path:"/events/:eventId",
		element:<EventDetails/>
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
