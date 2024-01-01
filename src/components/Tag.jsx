import React, { useState } from "react";

export default function Tag({ tagName, select_Tag, check_Tag, tag_css }) {
	const tagStyles = {
		html: "bg-orange-700 text-white",
		css: "bg-blue-700 text-white",
		javascript: "bg-yellow-300 text-black",
		react: "bg-blue-300 text-blue-900",
		default: "bg-white text-blue-950",
	};

	return (
		<button
			type="button"
			className={` ${
				check_Tag ? tagStyles[tagName] : tagStyles.default
			}  ${tag_css} font-bold rounded-sm uppercase `}
			onClick={() => {
				select_Tag(tagName);
			}}>
			{tagName}
		</button>
	);
}
