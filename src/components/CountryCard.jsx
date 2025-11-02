import { Link } from 'react-router';
import { motion } from 'framer-motion';

export default function CountryCard({ flagImg, name, capital, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.04 
      }}
      className="card bg-gray-800 w-96 shadow-sm"
    >
      <figure>
        <img src={flagImg} alt={name} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          {name}'s capital is {capital.join(", ")}.
        </p>
        <div className="card-actions justify-end">
          <Link to={`/country/${name}`} className="btn btn-primary">More details</Link>
        </div>
      </div>
    </motion.div>
  );
}
