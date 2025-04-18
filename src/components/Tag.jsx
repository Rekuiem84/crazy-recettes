import React from "react";
import close from "../assets/tag-close.svg";
import PropTypes from "prop-types";

function Tag({ name, type, onRemove }) {
	return (
		<div
			id={`tag-${name}`}
			className="tags badge ps-3 pe-2 py-2 me-3 mb-2 rounded"
			data-type={type}>
			<span>{name}</span>
			<button
				id={`btn-tag-${name}`}
				type="button"
				className="tag-close-btn align-middle ms-1"
				aria-label="Close"
				onClick={onRemove}>
				<img src={close} alt="" aria-hidden="true" />
			</button>
		</div>
	);
}

Tag.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["ingredient", "appareil", "ustensile"]),
	onRemove: PropTypes.func.isRequired,
};

export default Tag;
