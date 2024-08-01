import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../appwrite/databases";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../context/NoteContext";

export default function NoteCard({ note }) {
	const colors = JSON.parse(note.colors);
	const body = bodyParser(note.body);
	let mouseStartPos = { x: 0, y: 0 };
	const { setSelectedNote } = useContext(NoteContext);

	const [position, setPosition] = useState(JSON.parse(note.position));
	const [saving, setSaving] = useState(false);
	const textAreaRef = useRef(null);
	const cardRef = useRef(null);
	const keyUpTimer = useRef(null);

	useEffect(() => {
		setZIndex(cardRef.current);
		autoGrow(textAreaRef);
	}, []);

	const mouseDown = (e) => {
		if (e.target.className === "card-header") {
			mouseStartPos.x = e.clientX;
			mouseStartPos.y = e.clientY;

			document.addEventListener("mousemove", mouseMove);
			document.addEventListener("mouseup", mouseUp);

			setZIndex(cardRef.current);
			setSelectedNote(note);
		}
	};

	const mouseUp = (e) => {
		document.removeEventListener("mousemove", mouseMove);
		document.removeEventListener("mouseup", mouseUp);

		const newPosition = setNewOffset(cardRef.current);
		saveData("position", newPosition);
	};

	const mouseMove = (e) => {
		let mouseMoveDir = {
			x: mouseStartPos.x - e.clientX,
			y: mouseStartPos.y - e.clientY,
		};

		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
		setPosition(newPosition);
	};

	const saveData = async (key, value) => {
		const payload = { [key]: JSON.stringify(value) };

		try {
			await db["sticky-notes"].update(note.$id, payload);
		} catch (err) {
			console.log(err);
		}
		setSaving(false);
	};

	const handleKeyUp = () => {
		setSaving(true);

		if (keyUpTimer.current) {
			clearTimeout(keyUpTimer.current);
		}

		keyUpTimer.current = setTimeout(() => {
			saveData("body", textAreaRef.current.value);
		}, 1000);
	};

	return (
		<div
			ref={cardRef}
			onFocus={() => {
				setZIndex(cardRef.current);
			}}
			className="card"
			style={{
				backgroundColor: colors.colorBody,
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}>
			<div
				onMouseDown={mouseDown}
				className="card-header"
				style={{ backgroundColor: colors.colorHeader }}>
				<DeleteButton noteId={note.$id} />

				{saving && (
					<div className="card-saving">
						<Spinner color={colors.colorText} />
						<span style={{ color: colors.colorText }}>saving...</span>
					</div>
				)}
			</div>

			<div className="card-body">
				{" "}
				<textarea
					ref={textAreaRef}
					onKeyUp={handleKeyUp}
					onInput={() => {
						autoGrow(textAreaRef);
					}}
					onFocus={() => {
						setZIndex(cardRef.current);
						setSelectedNote(note);
					}}
					style={{ color: colors.colorText }}
					defaultValue={body}></textarea>
			</div>
		</div>
	);
}
