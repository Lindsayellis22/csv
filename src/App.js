import { useState } from "react";
import "./App.css";
// import React, { useRef } from "react";
// import ReactToPrint from "react-to-print";
import Badge from "./Badge";

function App() {
	const [file, setFile] = useState();
	const [array, setArray] = useState([]);

	const fileReader = new FileReader();

	// const componentRef = useRef();

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handlePrint = (e) => {
		setTimeout(function () {
			window.print();
		}, 0);
	};

	const csvFileToArray = (string) => {
		const endOfLine = string.indexOf("\n");
		const csvHeader = string.slice(0, endOfLine).split(",");

		const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

		const array = csvRows.map((i) => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});

		setArray(array);
		console.log(array);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	};

	return (
		<div>
			<div>
				<h1 className="header">Badge Printer</h1>
			</div>
			<form id="csv-form">
				<input
					type={"file"}
					id={"csvFileInput"}
					accept={".csv"}
					onChange={handleOnChange}
				/>

				<button
					className="btn"
					onClick={(e) => {
						return handleOnSubmit(e);
					}}
				>
					IMPORT CSV
				</button>

				<button
					className="btn"
					onClick={(e) => {
						return handlePrint(e);
					}}
				>
					Print
				</button>
			</form>

			{/* <ReactToPrint
				trigger={() => <button>Print this out!</button>}
				content={() => componentRef.current}
			/> */}

			<div>
				{array.map((badge) => (
					<h1>{<Badge data={badge} />}</h1>
				))}
			</div>
		</div>
	);
}

export default App;
