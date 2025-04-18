import React, { useState } from "react";
import Search from "../components/Search";
import Filters from "../components/Filters";
import RecettesList from "../components/RecettesList";

function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);

	const handleSearch = (value) => {
		setSearchTerm(value);
	};

	const handleTagsChange = (tags) => {
		setSelectedTags(tags);
	};

	return (
		<>
			<Search onSearch={handleSearch} />
			<Filters onTagsChange={handleTagsChange} />
			<RecettesList searchTerm={searchTerm} selectedTags={selectedTags} />
		</>
	);
}

export default Home;
