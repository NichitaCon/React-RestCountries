import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function SingleCountry() {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);

    //Country fetch
    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((SingleCountryResponse) => {
                console.log("Country response:", SingleCountryResponse.data);
                setCountry(SingleCountryResponse.data[0]);
            })
            .catch((error) => console.error("country api error:", error));
    }, [name]);

    //Weather fetch
    useEffect(() => {
        if (country && country.latlng) {
            axios
                .get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current=temperature_2m,is_day,precipitation_probability`
                )
                .then((WeatherResponse) => {
                    console.log("weather response:", WeatherResponse.data);
                    setWeather(WeatherResponse.data);
                })
                .catch((error) => console.error("Weather api error:", error));
        }
    }, [country]);

    if (country === null || weather === null) {
        return <p>Loading...</p>;
    }

    // console.log(country.currencies["EGP"]);
    // console.log(Object.keys(country.currencies));

    let currencies = Object.keys(country.currencies).map((currency) => {
        return (
            <p>
                <b>Code: </b> {currency} <br />
                <b>Name: </b> {country.currencies[currency].name} <br />
                <b>Symbol: </b> {country.currencies[currency].symbol}
            </p>
        );
    });

    return (
        <>
            {/* hero section */}
            <div className="hero bg-base-200 min-h-[60vh]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={country.coatOfArms.png}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">
                            {country.name.common}
                        </h1>
                        <p className="py-6">
                            {country.name.common}{" "}
                            {country.landlocked ? "is " : "is not "} a
                            landlocked country in {country.region} which has a
                            population of {country.population} people, located
                            in the {country.timezones} timezone.
                        </p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </div>
            </div>

            {/* half and half section */}
            <div className="container mx-auto flex flex-row justify-between gap-8 p-8">
                <div className="flex-1">
                    <h2 className="text-4xl font-bold flex justify-center mb-8">
                        Weather stats
                    </h2>
                    <p className="mb-2">
                        Its currently{" "}
                        {weather.current.is_day === 1 ? "day" : "night"} time in{" "}
                        {country.name.common}, with a temperature of{" "}
                        {weather.current.temperature_2m}
                        {weather.current_units.temperature_2m}
                    </p>
                    <p>
                        Chance of precipitation is
                        {weather.current.precipitation_probability < 30
                            ? " low "
                            : weather.current.precipitation_probability < 60
                            ? " medium "
                            : " high "}
                        ({weather.current.precipitation_probability}%)
                    </p>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex-1">
                    <h2 className="text-4xl font-bold flex justify-center mb-8">
                        Currency stats
                    </h2>
                    <p>basic currency text</p>
                </div>
            </div>
            {/* <img src={country.flags.png} />
            <p>
                <b>Name:</b> {country.name.common}
            </p>
            <p>
                <b>Official Name:</b> {country.name.official}
            </p>
            <p>
                <b>Capital(s):</b> {country.capital.join(", ")}
            </p>
            <h2>Currencies:</h2>
            {currencies}
            <img src={country.coatOfArms.png} /> */}
        </>
    );
}
