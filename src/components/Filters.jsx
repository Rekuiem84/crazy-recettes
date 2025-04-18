import React, { useEffect, useState, useCallback } from "react";
import Tag from "./Tag";
import Dropdown from "./Dropdown";
import recipes from "../data/recipes";
import PropTypes from "prop-types";

function Filters({ onTagsChange, searchTerm }) {
	const [selectedTags, setSelectedTags] = useState([]);
	const [allIngredients, setAllIngredients] = useState([]);
	const [allAppareils, setAllAppareils] = useState([]);
	const [allUstensiles, setAllUstensiles] = useState([]);

	const [availableIngredients, setAvailableIngredients] = useState([]);
	const [availableAppareils, setAvailableAppareils] = useState([]);
	const [availableUstensiles, setAvailableUstensiles] = useState([]);

	// Charger tous les éléments au début
	useEffect(() => {
		const ingredientsSet = new Set();
		const appareilsSet = new Set();
		const ustensilesSet = new Set();

		recipes.forEach((recipe) => {
			// Collecter les ingrédients
			recipe.ingredients.forEach((item) => {
				ingredientsSet.add(item.ingredient);
			});

			// Collecter les appareils
			appareilsSet.add(recipe.appliance);

			// Collecter les ustensiles
			recipe.ustensils.forEach((ustensil) => {
				ustensilesSet.add(ustensil);
			});
		});

		const sortedIngredients = Array.from(ingredientsSet).sort();
		const sortedAppareils = Array.from(appareilsSet).sort();
		const sortedUstensiles = Array.from(ustensilesSet).sort();

		setAllIngredients(sortedIngredients);
		setAllAppareils(sortedAppareils);
		setAllUstensiles(sortedUstensiles);

		setAvailableIngredients(sortedIngredients);
		setAvailableAppareils(sortedAppareils);
		setAvailableUstensiles(sortedUstensiles);
	}, []);

	// Obtenir les recettes filtrées
	const getFilteredRecipes = useCallback(() => {
		return recipes.filter((recipe) => {
			// Filtrer par terme de recherche
			if (searchTerm && searchTerm.trim() !== "") {
				const term = searchTerm.toLowerCase().trim();
				const nameMatch = recipe.name.toLowerCase().includes(term);
				const ingredientMatch = recipe.ingredients.some((item) =>
					item.ingredient.toLowerCase().includes(term)
				);
				const applianceMatch = recipe.appliance.toLowerCase().includes(term);
				const ustensilMatch = recipe.ustensils.some((ustensil) =>
					ustensil.toLowerCase().includes(term)
				);

				if (
					!nameMatch &&
					!ingredientMatch &&
					!applianceMatch &&
					!ustensilMatch
				) {
					return false;
				}
			}

			// Filtrer par tags sélectionnés
			for (const tag of selectedTags) {
				if (tag.type === "ingredient") {
					const hasIngredient = recipe.ingredients.some(
						(item) => item.ingredient.toLowerCase() === tag.value.toLowerCase()
					);
					if (!hasIngredient) return false;
				} else if (tag.type === "appareil") {
					if (recipe.appliance.toLowerCase() !== tag.value.toLowerCase()) {
						return false;
					}
				} else if (tag.type === "ustensile") {
					const hasUstensil = recipe.ustensils.some(
						(ustensil) => ustensil.toLowerCase() === tag.value.toLowerCase()
					);
					if (!hasUstensil) return false;
				}
			}

			return true;
		});
	}, [selectedTags, searchTerm]);

	// Mettre à jour les éléments disponibles
	const updateAvailableItems = useCallback(() => {
		const filteredRecipes = getFilteredRecipes();

		// Collecter les éléments des recettes filtrées
		const ingredientsSet = new Set();
		const appareilsSet = new Set();
		const ustensilesSet = new Set();

		// Ajouter les éléments des recettes filtrées
		filteredRecipes.forEach((recipe) => {
			recipe.ingredients.forEach((item) => {
				ingredientsSet.add(item.ingredient);
			});
			appareilsSet.add(recipe.appliance);
			recipe.ustensils.forEach((ustensil) => {
				ustensilesSet.add(ustensil);
			});
		});

		// Retirer les éléments déjà sélectionnés
		selectedTags.forEach((tag) => {
			if (tag.type === "ingredient") {
				ingredientsSet.delete(tag.value);
			} else if (tag.type === "appareil") {
				appareilsSet.delete(tag.value);
			} else if (tag.type === "ustensile") {
				ustensilesSet.delete(tag.value);
			}
		});

		setAvailableIngredients(Array.from(ingredientsSet).sort());
		setAvailableAppareils(Array.from(appareilsSet).sort());
		setAvailableUstensiles(Array.from(ustensilesSet).sort());
	}, [getFilteredRecipes, selectedTags]);

	// Mettre à jour les listes disponibles quand les filtres changent
	useEffect(() => {
		updateAvailableItems();
	}, [selectedTags, searchTerm, updateAvailableItems]);

	// Notifier le parent des tags sélectionnés
	useEffect(() => {
		if (onTagsChange) {
			onTagsChange(selectedTags);
		}
	}, [selectedTags, onTagsChange]);

	// Supprimer un tag
	const handleRemoveTag = (tagToRemove) => {
		setSelectedTags((prevTags) =>
			prevTags.filter(
				(tag) =>
					tag.value !== tagToRemove.value || tag.type !== tagToRemove.type
			)
		);

		// Pas besoin d'ajouter manuellement à la liste des disponibles
		// updateAvailableItems() s'en chargera automatiquement
	};

	// Ajouter un tag
	const handleAddTag = (type) => (value) => {
		// Vérifier si le tag existe déjà
		if (!selectedTags.some((tag) => tag.type === type && tag.value === value)) {
			setSelectedTags((prevTags) => [...prevTags, { type, value }]);
		}
	};

	return (
		<>
			<div className="tags-cont">
				{selectedTags.map((tag, index) => (
					<Tag
						key={index}
						name={tag.value}
						type={tag.type}
						onRemove={() => handleRemoveTag(tag)}
					/>
				))}
			</div>
			<div className="dropdown-wrapper">
				<Dropdown
					name={"Ingrédients"}
					title={"ingredients"}
					items={availableIngredients}
					onAddTag={handleAddTag("ingredient")}
				/>
				<Dropdown
					name={"Appareils"}
					title={"appareils"}
					items={availableAppareils}
					onAddTag={handleAddTag("appareil")}
				/>
				<Dropdown
					name={"Ustensiles"}
					title={"ustensiles"}
					items={availableUstensiles}
					onAddTag={handleAddTag("ustensile")}
				/>
			</div>
		</>
	);
}

Filters.propTypes = {
	onTagsChange: PropTypes.func,
	searchTerm: PropTypes.string,
};

export default Filters;
