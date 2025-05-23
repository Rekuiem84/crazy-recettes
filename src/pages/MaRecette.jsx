import { Link, Outlet, useParams } from "react-router-dom";
import recipes from "../data/recipes";

function MaRecette() {
	const { id } = useParams();
	const recette = recipes.find((r) => r.id === parseInt(id));

	if (!recette) {
		return (
			<div>
				<Link to="/" className="btn mb-3 back-to-home">
					Retour à l'accueil
				</Link>
				<p>Recette introuvable</p>
			</div>
		);
	}

	return (
		<div className="container mt-5 page-recette">
			<Link to="/" className="btn mb-3 back-to-home">
				Retour à l'accueil
			</Link>
			<h1 className="mb-3">{recette.name}</h1>
			<img src="https://picsum.photos/1600/600" alt="" />
			<p>
				<strong>Nombre de personnes :</strong> {recette.servings}
			</p>
			<p>
				<strong>Temps de préparation :</strong> {recette.time} min
			</p>

			<h2 className="mt-4">Ingrédients</h2>
			<ul>
				{recette.ingredients.map((item, index) => (
					<li key={index}>
						{item.ingredient}
						{item.quantity && ` : ${item.quantity}`}
						{item.unit && ` ${item.unit}`}
					</li>
				))}
			</ul>

			<h2 className="mt-4">Description</h2>
			<p>{recette.description}</p>

			<h2 className="mt-4">Matériel</h2>
			<p>
				<strong>Appareil :</strong> {recette.appliance}
			</p>
			<p>
				<strong>Ustensiles :</strong> {recette.ustensils.join(", ")}
			</p>
			<Outlet />
		</div>
	);
}

export default MaRecette;
