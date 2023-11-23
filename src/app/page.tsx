"use client";
import React, { useEffect, useState } from "react";

const page = () => {
	const [Myloc, setMyloc] = useState(1);
	const [Response, setResponse] = useState(null);
	const [City, setCity] = useState("Raipur");

	useEffect(() => {
		if (Myloc % 2) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					let lat = position.coords.latitude;
					let lon = position.coords.longitude;
					console.log(lat, lon);
					fetch(
						`https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`,
						{
							method: "GET",
							headers: {
								"X-Api-Key":
									"Y+1UufJ8QaVDH070pClTKw==nnSxnFXdmMCAFk4a",
							},
						}
					)
						.then((res) => res.json())
						.then((data) => {
							console.log(data);
							setResponse(data);
						});
				});
			} else {
				console.log("Navigation is not working");
			}
		} else {
			fetch(`https://api.api-ninjas.com/v1/weather?city=${City}`, {
				method: "GET",
				headers: {
					"X-Api-Key": "Y+1UufJ8QaVDH070pClTKw==nnSxnFXdmMCAFk4a",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setResponse(data);
				});
		}
	}, [Myloc]);

	return (
		<div>
			this is boolean : {Myloc} <br />
			<button
				onClick={() => {
					setMyloc(Myloc + 1);
				}}
			>
				Boll
			</button>
			<br />
			<input
				type="text"
				value={City}
				onChange={(e) => {
					setCity(e.target.value);
					console.log(City);
				}}
			/>
		</div>
	);
};

export default page;
