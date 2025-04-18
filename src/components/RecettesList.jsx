import recettes from "../data/recipes";
import Recette from "./Recette";

export default function RecettesList() {
	console.log(recettes);
	return (
		<div id="recipes-list" className="row g-4 recettes-list">
			{recettes.map((recette) => (
				<Recette recette={recette} key={recette.id} />
			))}
		</div>
	);
}
