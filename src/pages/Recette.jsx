import { useParams } from "react-router-dom";
import recipes from "../data/recipes";

function Recette() {
	const id = useParams();
	const recette = recipes.find((r) => r.id === parseInt(id));

	if (!recette) {
		return <p>Recette introuvable</p>;
	}

	return (
		<div>
			<h2>{recette.name}</h2>
			<img src={recette.image} alt={recette.name} />
			<p>
				<strong>Par :</strong> {recette.author}
			</p>
			<p>
				<strong>Calories :</strong> {recette.calories}
			</p>
			<p>{recette.description}</p>
			<h3>Instructions :</h3>
			<pre>{recette.instructions}</pre>
		</div>
	);
}

export default Recette;
