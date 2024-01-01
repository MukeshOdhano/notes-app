import React from "react";
import Tag from "./Tag";

export default function TaskCard(props) {
	const { task_name, tags, delTask, index } = props;
	// console.log(props);

	return (
		<div className="w-full min-h-[120px] taskCard flex flex-col justify-between bg-white rounded-md p-2 mb-4 last:mb-2 transition-colors duration-300 hover:bg-blue-50 shadow-[0_5px_6px_-5px_rgba(23,37,85,0.8)] ">
			<p className="task_text text-blue-950 text-lg capitalize  font-semibold ">
				{task_name}
			</p>
			<div className="task_tags_btns flex justify-between items-center">
				<div className="task_tags flex  gap-2   flex-wrap text-blue-600 text-sm capitalize">
					{tags.map((tag, i) => {
						return (
							<Tag
								key={i}
								tagName={tag}
								check_Tag={true}
								tag_css={
									"p-[3px] tracking-wide font-light text-[12px]"
								}
							/>
						);
					})}
				</div>
				<button
					className="task_del font-semibold text-sm rounded bg-red-100 text-red-800 uppercase px-3 py-1"
					onClick={() => delTask(index)}>
					del
				</button>
			</div>
		</div>
	);
}
