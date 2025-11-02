import { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "../components/CountryCard";

export default function Home({ searchTerm }) {
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://restcountries.com/v3.1/all?fields=flags,flag,name,capital,cca3"
            )
            .then((response) => {
                console.log(response.data);
                setCountriesList(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const filteredCountries = countriesList.filter((country) => {
        return country.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    let countryCards = filteredCountries.map((country) => {
        return (
            <CountryCard
                key={country.cca3}
                flagImg={country.flags.png}
                name={country.name.common}
                capital={country.capital}
            />
        );
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* <h1 className="text-3xl font-bold text-center mb-8">Home</h1> */}
            {filteredCountries.length === 0 ? (
                <p className="text-center text-xl text-gray-400">
                    No countries found matching "{searchTerm}"
                </p>
            ) : (
                <div className="grid grid-cols-3 gap-12 justify-items-center max-w-6xl mx-auto">
                    {countryCards}
                </div>
            )}
        </div>
    );
}
