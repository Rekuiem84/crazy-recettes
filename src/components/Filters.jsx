import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import Dropdown from "./Dropdown";
import recipes from "../data/recipes";
import PropTypes from "prop-types";

function Filters({ onTagsChange }) {
	const [selectedTags, setSelectedTags] = useState([]);
	const [allIngredients, setAllIngredients] = useState([]);
	const [allAppareils, setAllAppareils] = useState([]);
	const [allUstensiles, setAllUstensiles] = useState([]);

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

		setAllIngredients(Array.from(ingredientsSet).sort());
		setAllAppareils(Array.from(appareilsSet).sort());
		setAllUstensiles(Array.from(ustensilesSet).sort());
	}, []);

	// Notifier le parent quand les tags changent
	useEffect(() => {
		if (onTagsChange) {
			onTagsChange(selectedTags);
		}
	}, [selectedTags, onTagsChange]);

	const handleRemoveTag = (tag) => {
		setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
	};

	const handleAddTag = (type) => (value) => {
		if (!selectedTags.some((tag) => tag.value === value)) {
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
					name={"Ingredients"}
					title={"ingredients"}
					items={allIngredients}
					onAddTag={handleAddTag("ingredient")}
				/>
				<Dropdown
					name={"Appareils"}
					title={"appareils"}
					items={allAppareils}
					onAddTag={handleAddTag("appareil")}
				/>
				<Dropdown
					name={"Ustensiles"}
					title={"ustensiles"}
					items={allUstensiles}
					onAddTag={handleAddTag("ustensile")}
				/>
			</div>
		</>
	);
}

Filters.propTypes = {
	onTagsChange: PropTypes.func,
};

export default Filters;
