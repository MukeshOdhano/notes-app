import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";
import Trash from "../icons/Trash";
import { useContext } from "react";

const DeleteButton = ({ noteId }) => {
	const { setNotes } = useContext(NoteContext);
	const handleDelete = async () => {
		await db["sticky-notes"].delete(noteId);
		setNotes((prevStats) => prevStats.filter((note) => note.$id !== noteId));
	};

	return (
		<div onClick={handleDelete} className="deleteButton">
			<Trash />
		</div>
	);
};

export default DeleteButton;
