import { useState } from "react";
import loupe from "../assets/search.svg";

export default function Search() {
	const [search, setSearch] = useState("");

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};
	return (
		<div className="mb-4 row">
			<div className="search position-relative">
				<form id="form" role="search" autoComplete="off">
					<label className="visually-hidden" htmlFor="search">
						Main search
					</label>
					<input
						id="search"
						className="search-input col-12 rounded"
						type="text"
						placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
						value={search}
						onChange={handleSearchChange}
					/>
					<div className="search-img position-absolute top-50 translate-middle">
						<img className="search-logo" alt="" src={loupe} />
					</div>
				</form>
			</div>
		</div>
	);
}
