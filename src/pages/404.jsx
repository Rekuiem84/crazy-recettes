import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
	return (
		<div className="error-page">
			<div>Page non trouvée 404</div>
			<Link to={`/`}>Page d'accueil</Link>
		</div>
	);
}

export default ErrorPage;
