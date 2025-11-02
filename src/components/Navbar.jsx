import { Link, useNavigate } from "react-router";

const Navbar = ({ searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate('/');
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Rest Countries
                </Link>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search countries..."
                    className="input input-bordered w-24 md:w-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default Navbar;
