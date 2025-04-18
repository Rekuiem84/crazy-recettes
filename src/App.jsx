import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import RecettesList from "./components/RecettesList";
import { Outlet } from "react-router-dom";
import Search from "./components/Search";
import TriDropdown from "./components/TriDropdown";
import recipes from "./data/recipes";
import { useState } from "react";
import Tag from "./components/Tag";

function App() {
	const [selectedTag, setSelectedTag] = useState([]);
	const ingredients = [];
	const appareils = [];
	const ustensiles = [];

	// recipes.forEach((recipe) => {
	// 	recipe.ingredients.forEach((item) => {
	// 		ingredients.push(item);
	// 	});
	// 	appareils.push(recipe.appliance);
	// 	recipe.ustensils.forEach((item) => {
	// 		ustensiles.push(item);
	// 	});
	// });
	// Récupérer tous les ingrédients uniques

	// const uniqueIngredientsSet = new Set();
	// ingredients.forEach((recipe) => {
	// 	uniqueIngredientsSet.add(recipe.ingredient);
	// });
	// const uniqueIngredients = Array.from(uniqueIngredientsSet);

	// const uniqueAppareilsSet = new Set(appareils);
	// uniqueAppareils.forEach((recipe) => {
	// 	uniqueAppareilsSet.add(recipe);
	// });
	// const uniqueAppareils = Array.from(uniqueAppareilsSet);

	// const uniqueUstensilesSet = new Set(ustensiles);
	// uniqueUstensiles.forEach((recipe) => {
	// 	uniqueUstensilesSet.add(recipe);
	// });

	// Fonction de rappel pour gérer les sélections de TriDropdown
	const handleTagSelection = (selectedItems) => {
		setSelectedTag(selectedItems);
	};
	return (
		<>
			<Header />
			<Search />
			<div className="tags-cont">
				{/* Affichage des éléments sélectionnés
				{selectedIngredients.length > 0 && (
					<div className="selected-items">
						<h3>Ingrédients sélectionnés :</h3>
						{selectedIngredients.map((ingredient, index) => (
							<Tag key={index} name={ingredient.name} />
						))}
					</div>
				)} */}
			</div>
			<div className="dropdowns-cont">
				{/* <TriDropdown
					title={"ingredients"}
					name={"Ingrédients"}
					items={uniqueIngredients}
					onSelect={handleTagSelection}
				/>
				<TriDropdown
					title={"appareils"}
					name={"Appareils"}
					items={uniqueAppareils}
					onSelect={handleTagSelection}
				/>
				<TriDropdown
					title={"ustensiles"}
					name={"Ustensiles"}
					items={uniqueUstensiles}
					onSelect={handleTagSelection}
				/> */}
			</div>
			<RecettesList />
			<Outlet />
		</>
	);
}

export default App;
