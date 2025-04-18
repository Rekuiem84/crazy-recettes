import { useState } from "react";
import PropTypes from "prop-types";

function Dropdown({ name, title, items, onAddTag }) {
	const [isOpen, setIsOpen] = useState(false);
	// Fonction pour basculer l'état isOpen
	function toggleDropdown() {
		setIsOpen(!isOpen);
	}
	const itemsNumber = items.length;

	const [selectedTags, setSelectedTags] = useState([]);

	function handleAddTag(tag) {
		if (!selectedTags.includes(tag)) {
			setSelectedTags([...selectedTags, tag]);

			if (onAddTag) {
				onAddTag(tag);
			}
		}
	}

	return (
		<div className="dropdown" id={title}>
			<p className="title" onClick={toggleDropdown}>
				{name}
			</p>
			{isOpen && itemsNumber != 0 && (
				<div className="dropdown-list">
					<ul>
						{items.map((item, index) => (
							<li
								key={index}
								className="dropdown-item"
								onClick={() => handleAddTag(item)}>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
Dropdown.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	onAddTag: PropTypes.func,
};

export default Dropdown;
