/* fichier root.jsx */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Recette from "../pages/Recette";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/recette/:id",
				element: <Recette />,
			},
		],
	},
]);

export default router;
