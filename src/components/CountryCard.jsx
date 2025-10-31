export default function CountryCard({ flagImg, name, capital }) {
  return (
    <>
      <div className="card bg-gray-800 w-96 shadow-sm">
        <figure>
          <img src={flagImg} alt={name} className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>
            {name}'s capital is {capital.join(", ")}.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">More details (LINK ME LATER :P)</button>
          </div>
        </div>
      </div>
      {/* <img alt={name} src={flagImg} />
      <p>
        <b>Name: </b> {name}
      </p>
      <p>
        <b>Capital: </b> {capital.join(", ")}
      </p> */}
    </>
  );
}
