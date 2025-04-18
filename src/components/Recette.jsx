import PropTypes from "prop-types";
import watch from "../assets/watch-time.svg";
import { Link } from "react-router-dom";

export default function Recette(props) {
	const { name, time, ingredients, description } = props.recette;
	return (
		<Link to={`/recette/${props.recette.id}`}>
			<div className="recette">
				<div className="img-cont">
					<img src="https://picsum.photos/600/300" alt="" />
				</div>
				<div className="body">
					<div className="title">
						<p className="name">{name}</p>
						<div className="time">
							<img src={watch} alt="Watch icon" />
							<p>{time} min</p>
						</div>
					</div>
					<div className="content">
						<ul className="ingredients-list">
							{ingredients.map((ingredient, index) => (
								<li key={index}>
									<span className="ingredient">{ingredient.ingredient}</span>
								</li>
							))}
						</ul>
						<p className="description">{description}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
