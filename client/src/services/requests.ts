import axios from "axios";

const getAllContinents = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/continents`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCountriesByContinent = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/countries/continent/:id`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export { getCountriesByContinent, getAllContinents };
