import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState } from "react";

//import components
import Navbar from "./components/Navbar";

//import pages
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <Router>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Routes>
                    <Route
                        path="/"
                        element={<Home searchTerm={searchTerm} />}
                    />
                    <Route path="/country/:name" element={<SingleCountry />} />
                </Routes>
            </Router>
        </>
    );
}
