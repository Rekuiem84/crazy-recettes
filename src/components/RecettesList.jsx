import recettes from "../data/recipes";
import Recette from "./Recette";
import PropTypes from "prop-types";

export default function RecettesList({ searchTerm, selectedTags = [] }) {
	const filteredRecettes = recettes.filter((recette) => {
		// Filtre par terme de recherche
		if (searchTerm && searchTerm.trim() !== "") {
			const searchTermLower = searchTerm.toLowerCase().trim();

			// Vérifier dans le nom de la recette
			const nameMatch = recette.name.toLowerCase().includes(searchTermLower);

			// Vérifier dans les ingrédients
			const ingredientMatch = recette.ingredients.some((item) =>
				item.ingredient.toLowerCase().includes(searchTermLower)
			);

			// Vérifier dans l'appareil
			const applianceMatch = recette.appliance
				.toLowerCase()
				.includes(searchTermLower);

			// Vérifier dans les ustensiles
			const ustensilMatch = recette.ustensils.some((ustensil) =>
				ustensil.toLowerCase().includes(searchTermLower)
			);

			// Si aucun match pour le terme de recherche, ne pas inclure la recette
			if (!nameMatch && !ingredientMatch && !applianceMatch && !ustensilMatch) {
				return false;
			}
		}

		// Filtre par tags sélectionnés
		if (selectedTags.length > 0) {
			// Vérifier chaque tag
			for (const tag of selectedTags) {
				// Tag de type ingrédient
				if (tag.type === "ingredient") {
					const hasIngredient = recette.ingredients.some(
						(item) => item.ingredient.toLowerCase() === tag.value.toLowerCase()
					);
					if (!hasIngredient) return false;
				}

				// Tag de type appareil
				else if (tag.type === "appareil") {
					if (recette.appliance.toLowerCase() !== tag.value.toLowerCase()) {
						return false;
					}
				}

				// Tag de type ustensile
				else if (tag.type === "ustensile") {
					const hasUstensil = recette.ustensils.some(
						(ustensil) => ustensil.toLowerCase() === tag.value.toLowerCase()
					);
					if (!hasUstensil) return false;
				}
			}
		}

		// Si la recette passe tous les filtres, l'inclure
		return true;
	});

	return (
		<div id="recipes-list" className="row g-4 recettes-list">
			{filteredRecettes.length > 0 ? (
				filteredRecettes.map((recette) => (
					<Recette recette={recette} key={recette.id} />
				))
			) : (
				<div className="col-12 text-center">
					<p>Aucune recette ne correspond à vos critères de recherche.</p>
				</div>
			)}
		</div>
	);
}
