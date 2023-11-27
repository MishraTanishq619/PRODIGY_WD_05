"use client";
import React, { useEffect, useState } from "react";

const page = () => {
	const [CityResponse, setCityResponse] = useState(null);
	const [Response, setResponse] = useState(null);
	const [City, setCity] = useState("");

	useEffect(() => {
		window.addEventListener("keypress", (e) => {
			// console.log(e.key == "Enter");
			if (e.key == "Enter") {
				setCityResponse(null);
				document.getElementById("FindBtn")?.click();
			}
		});
	}, []);

	const [Loc, setLoc] = useState(null);
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				setLoc({ Lat: lat, Lon: lon });
				// console.log(lat, lon);
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
						// console.log(data);
						setResponse(data);
					});
			});
		} else {
			// console.log("Navigation is not working");
		}
	}, []);

	const FindCityWeather = () => {
		{
			fetch(`https://api.api-ninjas.com/v1/weather?city=${City}`, {
				method: "GET",
				headers: {
					"X-Api-Key": "Y+1UufJ8QaVDH070pClTKw==nnSxnFXdmMCAFk4a",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					setCityResponse(data);
				});
		}
	};

	return (
		<div className="w-4/5 text-white border-4 border-solid border-black absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-slate-400 bg-opacity-60 flex mobiles:flex-col mobiles:translate-y-[10%] mobiles:top-0 mobiles:mb-10 ">
			<div className="border-4 border-solid border-black w-1/2 m-1 flex flex-col px-6 mobiles:w-[98%]">
				<h1 className="mx-auto text-[2vw] underline font-bold mt-8  mobiles:text-[6vw]">
					Your Location:&nbsp;
					<p>
						{Loc
							? Loc.Lat.toFixed(2) + " , " + Loc.Lon.toFixed(2)
							: ""}
					</p>
				</h1>
				<br />
				<h2 className="text-[7vmin] mx-auto">
					{Response ? Response.temp + " 'C" : "Loading..."}
				</h2>
				<p className="text-[2vh] m-1">
					cloud_pct : {Response ? Response.cloud_pct : "---"}
				</p>
				<p className="text-[2vh] m-1">
					feels_like : {Response ? Response.feels_like : "---"}
				</p>
				<p className="text-[2vh] m-1">
					humidity : {Response ? Response.humidity : "---"}
				</p>
				<p className="text-[2vh] m-1">
					max_temp : {Response ? Response.max_temp : "---"}
				</p>
				<p className="text-[2vh] m-1">
					min_temp : {Response ? Response.min_temp : "---"}
				</p>
				<p className="text-[2vh] m-1">
					sunrise : {Response ? Response.sunrise : "---"}
				</p>
				<p className="text-[2vh] m-1">
					sunset : {Response ? Response.sunset : "---"}
				</p>
				<p className="text-[2vh] m-1">
					temp : {Response ? Response.temp : "---"}
				</p>
				<p className="text-[2vh] m-1">
					wind_degrees : {Response ? Response.wind_degrees : "---"}
				</p>
				<p className="text-[2vh] m-1">
					wind_speed : {Response ? Response.wind_speed : "---"}
				</p>
			</div>
			<div className="border-4 border-solid border-black w-1/2 m-1 flex flex-col px-6 mobiles:w-[98%]">
				<h1 className="mx-auto text-[2vw] underline font-bold mt-8  mobiles:text-[6vw]">
					Location :{" "}
					<input
						className="border-4 px-2 border-solid border-black text-black w-[40%]"
						type="text"
						value={City}
						onChange={(e) => {
							setCity(e.target.value);
							// console.log(City);
						}}
					/>
					<button
						onClick={FindCityWeather}
						className="border-2 border-solid border-black ml-2 bg-orange-400 px-2 py-1"
						id="FindBtn"
					>
						Find
					</button>
				</h1>
				<br />
				<h2 className="text-[7vmin] mx-auto">
					{CityResponse ? CityResponse.temp + " 'C" : "Finding..."}
				</h2>
				<p className="text-[2vh] m-1">
					cloud_pct : {CityResponse ? CityResponse.cloud_pct : "---"}
				</p>
				<p className="text-[2vh] m-1">
					feels_like :{" "}
					{CityResponse ? CityResponse.feels_like : "---"}
				</p>
				<p className="text-[2vh] m-1">
					humidity : {CityResponse ? CityResponse.humidity : "---"}
				</p>
				<p className="text-[2vh] m-1">
					max_temp : {CityResponse ? CityResponse.max_temp : "---"}
				</p>
				<p className="text-[2vh] m-1">
					min_temp : {CityResponse ? CityResponse.min_temp : "---"}
				</p>
				<p className="text-[2vh] m-1">
					sunrise : {CityResponse ? CityResponse.sunrise : "---"}
				</p>
				<p className="text-[2vh] m-1">
					sunset : {CityResponse ? CityResponse.sunset : "---"}
				</p>
				<p className="text-[2vh] m-1">
					temp : {CityResponse ? CityResponse.temp : "---"}
				</p>
				<p className="text-[2vh] m-1">
					wind_degrees :{" "}
					{CityResponse ? CityResponse.wind_degrees : "---"}
				</p>
				<p className="text-[2vh] m-1">
					wind_speed :{" "}
					{CityResponse ? CityResponse.wind_speed : "---"}
				</p>
			</div>
		</div>
	);
};

export default page;
