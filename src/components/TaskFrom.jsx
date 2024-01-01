import React, { useState } from "react";
import Tag from "./Tag";

export default function TaskFrom({ set_Tasks }) {
	const [taskData, setTaskData] = useState({
		task: "",
		status: "Todo",
		tags: [],
	});

	const checkTag = (tag_name) => {
		return taskData.tags.some((item) => item === tag_name);
	};

	const selectTag = (tag_name) => {
		if (taskData.tags.some((item) => item === tag_name)) {
			const filterTags = taskData.tags.filter(
				(item) => item !== tag_name
			);

			setTaskData((prev) => {
				return { ...prev, tags: filterTags };
			});
		} else {
			setTaskData((prev) => {
				return { ...prev, tags: [...prev.tags, tag_name] };
			});
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setTaskData((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskData.task === "") return;
		set_Tasks((prev) => {
			return [...prev, taskData];
		});

		setTaskData({
			task: "",
			status: "Todo",
			tags: [],
		});
	};
	// console.log(taskData);

	return (
		<header className="w-full h-[40vh] lg:flex-[1] bg-[#172854]  backdrop-blur px-6 p-4 flex flex-wrap justify-center flex-col items-center">
			<form
				onSubmit={handleSubmit}
				className="min-w-[60%] h-full  flex flex-col justify-evenly items-center rounded overflow-hidden">
				<input
					value={taskData.task}
					type="text"
					name="task"
					required={true}
					placeholder="Enter Task"
					className="w-full p-2 text-xl outline-none rounded  text-[#172854]  bg-[#f2e6ff] placeholder:text-gray-500"
					onChange={handleChange}
				/>

				<div
					className={`p-2 w-full bg-blue-400 bg-opacity-20 backdrop-blur flex gap-x-2 justify-between rounded `}>
					<div className="flex gap-x-2 mr-4">
						<Tag
							tagName={`html`}
							select_Tag={selectTag}
							check_Tag={checkTag("html")}
							tag_css={"px-2 py-1"}
						/>
						<Tag
							tagName={`css`}
							select_Tag={selectTag}
							check_Tag={checkTag("css")}
							tag_css={"px-2 py-1"}
						/>
						<Tag
							tagName={`javascript`}
							select_Tag={selectTag}
							check_Tag={checkTag("javascript")}
							tag_css={"px-2 py-1"}
						/>
						<Tag
							tagName={`react`}
							select_Tag={selectTag}
							check_Tag={checkTag("react")}
							tag_css={"px-2 py-1"}
						/>
					</div>

					<select
						className="task_status outline-none uppercase font-bold text-blue-950 px-3 py-2 mr-4 "
						name="status"
						value={taskData.status}
						onChange={handleChange}>
						<option className="outline-none" value={"todo"}>
							todo
						</option>
						<option className="outline-none" value={"Doing"}>
							Doing
						</option>
						<option className="outline-none" value={"Done"}>
							Done
						</option>
					</select>

					<button
						type="submit "
						className="px-4 outline-none py-2 text-xl bg-[#5840f3] rounded uppercase text-blue-100">
						Submit
					</button>
				</div>
			</form>
		</header>
	);
}
