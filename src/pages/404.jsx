import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
	return (
		<div>
			<div>Page non trouvée 404</div>
			<Link to={`/`}>Page d'accueil</Link>
		</div>
	);
}

export default ErrorPage;
