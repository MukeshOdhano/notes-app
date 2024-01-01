import React from "react";
import TaskCard from "./TaskCard";

export default function Task(props) {
	const { title, tasks, deletTask } = props;
	// console.log(props);

	return (
		<section
			className={`task-col p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-lg  flex-1 flex flex-col justify-top items-center  shadow-gray-100`}>
			<h1 className="text-2xl my-1 font-extrabold uppercase text-blue-50 tracking-wider flex gap-2 ">
				<span>{title.emoji}</span>
				<span>{title._name}</span>
			</h1>

			<hr className="w-full h-1 my-2 bg-blue-100 rounded-full outline-none border-none" />

			<div className="w-full mt-2 flex flex-col justify-center items-center">
				{ tasks.map(
					(task, index) =>
						task.status === title._name && (
							<TaskCard
								key={index}
								task_name={task.task}
								tags={task.tags}
								delTask={deletTask}
								index={index}
							/>
						)
				)}
			</div>
		</section>
	);
}
