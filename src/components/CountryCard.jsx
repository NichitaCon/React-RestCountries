import { Link } from 'react-router';
import { motion } from 'framer-motion';

export default function CountryCard({ flagImg, name, capital, index }) {
  // Only animate first 30 cards
  const shouldAnimate = index < 30;

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldAnimate ? 0.5 : 0, 
        ease: "easeOut",
        delay: shouldAnimate ? index * 0.04 : 0
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
