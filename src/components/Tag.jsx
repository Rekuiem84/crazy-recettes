import React from "react";
import close from "../assets/tag-close.svg";

function Tag(name) {
	return (
		<div
			id={`tag-${name}`}
			class="tags badge bg-primary ps-3 pe-2 py-2 me-3 mb-2 rounded">
			<span>{name}</span>
			<button
				id={`btn-tag-${name}`}
				type="button"
				class="tag-close-btn align-middle ms-1"
				aria-label="Close">
				<img src={close} alt="" aria-hidden="true" />
			</button>
		</div>
	);
}

export default Tag;
