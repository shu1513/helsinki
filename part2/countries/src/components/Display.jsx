import axios from "axios";
import { useState, useEffect } from "react";

const Display = ({ countrySearch }) => {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    console.log("using effect");
    axios.get(baseUrl).then((response) => {
      console.log("promise fufilled, got data from API");
      setAllCountries(response.data);
    });
  }, []);

  //call api with the countrysearch,async
  //get country names
  //display country names
  const showCountries = !countrySearch
    ? []
    : allCountries.filter((country) =>
        country.name.common
          .toLowerCase()
          .startsWith(countrySearch.toLowerCase())
      );
  return (
    <div>
      {showCountries.map((country) => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </div>
  );
};
export default Display;
