/* fichier root.jsx */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import MaRecette from "../pages/MaRecette";
import ErrorPage from "../pages/404";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/recette/:id",
				element: <MaRecette />,
			},
		],
	},
]);

export default router;
