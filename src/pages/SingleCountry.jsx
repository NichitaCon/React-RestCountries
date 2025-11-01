import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function SingleCountry() {
    const { name } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((response) => {
                console.log(response.data);
                setCountry(response.data[0]);
            })
            .catch((error) => console.log(error));
    }, []);

    if (country === null) {
        return <p>Loading...</p>;
    }

    console.log(country.currencies["EGP"]);
    console.log(Object.keys(country.currencies));

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
                            find api that includes country desc here!
                        </p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
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
