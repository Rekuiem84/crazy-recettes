import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function TriDropdown({ name, title, items, onSelect }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [availableItems, setAvailableItems] = useState(items);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	// Notifier le parent chaque fois que selectedItems change
	useEffect(() => {
		setAvailableItems(items);
	}, [items]);
	// Notifier le parent chaque fois que selectedItems change
	useEffect(() => {
		if (onSelect) {
			onSelect(selectedItems);
		}
	}, [selectedItems, onSelect]);

	const handleItemSelect = (item) => {
		// Uniquement ajouter l'élément aux sélectionnés s'il n'y est pas déjà
		if (!selectedItems.includes(item)) {
			const newSelectedItems = [...selectedItems, item];
			setSelectedItems(newSelectedItems);
			// Retirer l'élément sélectionné des disponibles
			setAvailableItems(availableItems.filter((i) => i !== item));
		}
	};

	return (
		<div className="dropdown" id={title}>
			<p className="title" onClick={toggleDropdown}>
				{name} {selectedItems.length > 0 && `(${selectedItems.length})`}
			</p>
			{isOpen && (
				<div className="content">
					{availableItems.map((item, key) => (
						<span
							key={key}
							className="item"
							onClick={() => handleItemSelect(item)}>
							{item.name}
						</span>
					))}
				</div>
			)}
		</div>
	);
}

export default TriDropdown;
