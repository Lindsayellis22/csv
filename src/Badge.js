import React from "react";
import "./Badge.css";
// import { forwardRef } from "react";

function Badge({ data }) {
	return (
		<div className="users">
			{Object.keys(data).map((val) => (
				<div key={data}>
					<h3>{val}</h3>
					<h5>{data[val]}</h5>
				</div>
			))}
		</div>
	);
}

export default Badge;
