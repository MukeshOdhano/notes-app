import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useContext, useRef } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
	const { setNotes } = useContext(NoteContext);
	const startingPos = useRef(10);

	const addNote = async () => {
		const payload = {
			position: JSON.stringify({
				x: startingPos.current,
				y: startingPos.current,
			}),
			colors: JSON.stringify(colors[0]),
		};
		startingPos.current += 35;

		const response = await db["sticky-notes"].create(payload);
		setNotes((prevStats) => [response, ...prevStats]);
	};
	return (
		<div id="add-btn" onClick={addNote}>
			<Plus />
		</div>
	);
};

export default AddButton;
