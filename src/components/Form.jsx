import Search from "./Search";
import Tag from "./Tag";
import TriDropdown from "./TriDropdown";
import { useState, useEffect } from "react";
import recipes from "../data/recipes";

export default function Form() {
	const [tags, setTags] = useState([]);
	const [allIngredients, setAllIngredients] = useState([]);
	const [allAppareils, setAllAppareils] = useState([]);
	const [allUstensiles, setAllUstensiles] = useState([]);

	// Extraire tous les ingrédients uniques au chargement du composant
	useEffect(() => {
		// Créer un Set pour stocker les ingrédients uniques
		const ingredientsSet = new Set();
		const appareilsSet = new Set();
		const ustensilesSet = new Set();

		// Parcourir toutes les recettes
		recipes.forEach((recipe) => {
			// Parcourir tous les ingrédients de chaque recette
			recipe.ingredients.forEach((item) => {
				// Ajouter l'ingrédient au Set (les doublons sont automatiquement ignorés)
				ingredientsSet.add(item.ingredient);
				appareilsSet.add(recipe.appliance);
				ustensilesSet.add(recipe.ustensils);
			});
		});

		// Convertir le Set en tableau et le trier par ordre alphabétique
		const uniqueIngredients = Array.from(ingredientsSet).sort();
		const uniqueAppareils = Array.from(appareilsSet).sort();
		const uniqueUstensiles = Array.from(ustensilesSet).sort();

		setAllIngredients(uniqueIngredients);
		setAllAppareils(uniqueAppareils);
		setAllUstensiles(uniqueUstensiles);
	}, []);

	return (
		<>
			<Search />
			<div id="tags-container" className="mb-2 d-flex flex-wrap">
				{tags.map((tag) => (
					<Tag key={tag} name={tag} />
				))}
			</div>
			<div className="dropdowns-cont">
				<TriDropdown options={allIngredients} name={"Ingredients"} />
				<TriDropdown options={allAppareils} name={"Appareil"} />
				<TriDropdown options={allUstensiles} name={"Ustensiles"} />
			</div>
		</>
	);
}
