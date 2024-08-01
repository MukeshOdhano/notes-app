import AddButton from "./AddButton";
import colorsData from "../assets/colors.json";
import Color from "./Color";

const Controls = () => {
	return (
		<div id="controls">
			<AddButton />
			{colorsData.map((color) => (
				<Color key={color.id} color={color} />
			))}
		</div>
	);
};

export default Controls;
