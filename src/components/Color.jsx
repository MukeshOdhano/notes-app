import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";

const Color = ({ color }) => {
	const { selectedNote, notes, setNotes } = useContext(NoteContext);
	const changeColor = () => {
		try {
			const currentNoteIndex = notes.findIndex(
				(note) => note.$id === selectedNote.$id
			);

			const updateNote = {
				...notes[currentNoteIndex],
				colors: JSON.stringify(color),
			};

			const newNotes = [...notes];
			newNotes[currentNoteIndex] = updateNote;
			setNotes(newNotes);

			db["sticky-notes"].update(selectedNote.$id, {
				colors: JSON.stringify(color),
			});
		} catch (err) {
			alert("You must select note befor changing color");
		}
	};
	return (
		<div
			onClick={changeColor}
			className="color"
			style={{ backgroundColor: color.colorHeader }}></div>
	);
};
export default Color;
