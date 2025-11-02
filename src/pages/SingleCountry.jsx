import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";

export default function SingleCountry() {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);

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

    //Currency exchange fetch
    useEffect(() => {
        if (country && country.currencies) {
            const currencyCode = Object.keys(country.currencies)[0];
            axios
                .get(
                    `https://api.exchangerate.host/convert?from=EUR&to=${currencyCode}&amount=1&access_key=387d05a7415fb53062718282321e3f3c`
                )
                .then((ExchangeResponse) => {
                    console.log("exchange response:", ExchangeResponse.data);
                    setExchangeRate(ExchangeResponse.data);
                })
                .catch((error) => {
                    setExchangeRate("error");
                    console.error("Exchange api error:", error)
                });
        }
    }, [country]);

    if (country === null || weather === null || exchangeRate === null) {
        return (
            <div className="hero bg-base-200 min-h-[60vh]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {/* <div className="skeleton min-w-[80vh] min-h-[60vh]"></div> */}
                    <span class="loading loading-ring loading-xl"></span>
                </div>
            </div>
        );
    }

    const currencyCode = Object.keys(country.currencies)[0];
    const currencyInfo = country.currencies[currencyCode];

    // console.log(country.currencies["EGP"]);
    // console.log(Object.keys(country.currencies));

    // let currencies = Object.keys(country.currencies).map((currency) => {
    //     return (
    //         <p>
    //             <b>Code: </b> {currency} <br />
    //             <b>Name: </b> {country.currencies[currency].name} <br />
    //             <b>Symbol: </b> {country.currencies[currency].symbol}
    //         </p>
    //     );
    // });

    return (
        <>
            {/* hero section */}
            <div className="hero bg-base-200 min-h-[60vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="hero-content flex-col lg:flex-row-reverse"
                >
                    <img
                        src={country.coatOfArms.png}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">
                            {country.name.common}
                        </h1>
                        <p className="py-6">
                            {country.name.common} is a{" "}
                            {country.landlocked ? "landlocked" : "coastal"}{" "}
                            country located in {country.region}, with a
                            population of {country.population.toLocaleString()}{" "}
                            people. {country.name.common} is located in the{" "}
                            {country.timezones[0]} timezone.
                        </p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </motion.div>
            </div>

            {/* half and half section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="container mx-auto flex flex-row justify-between gap-8 p-8"
            >
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
                    <p className="mb-2">
                        The currency in {country.name.common} is the{" "}
                        {currencyInfo.name} ({currencyCode})
                    </p>
                    
                    <p>
                        {exchangeRate === "error" 
                            ? "Cannot convert to EUR, too many API requests :(" 
                            : `1 Euro converts to ${exchangeRate.result} ${exchangeRate.query.to}`
                        }
                    </p>
                </div>
            </motion.div>
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
