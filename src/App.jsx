import React, { useEffect, useState } from "react";
import "./App.css";
import TaskFrom from "./components/TaskFrom";
import Task from "./components/Task";

const savedTasks = localStorage.getItem("tasks");
console.log(savedTasks);

export default function App() {
	const [tasksList, setTaskList] = useState(JSON.parse(savedTasks) || []);
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasksList));
	}, [tasksList]);

	const deletHandler = (taskIndex) => {
		const newTasks = tasksList.filter((task, i) => i !== taskIndex);
		setTaskList(newTasks);
	};

	// console.log(tasksList);
	return (
		<div>
			<TaskFrom set_Tasks={setTaskList} />

			<main className="App-container w-full min-h-screen  bg-gradient-to-b from-[#172854] to-[#641ca8] px-6 p-4 flex justify-between items-baseline gap-2 font-general-sans">
				<Task
					title={{ _name: "Todo", emoji: "📝" }}
					tasks={tasksList}
					deletTask={deletHandler}
				/>
				<Task
					title={{ _name: "Doing", emoji: "✍" }}
					tasks={tasksList}
					deletTask={deletHandler}
				/>
				<Task
					title={{ _name: "Done", emoji: "✔" }}
					tasks={tasksList}
					deletTask={deletHandler}
				/>
			</main>
		</div>
	);
}
