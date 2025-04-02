import axios from "axios";

const getAllContinents = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/continents`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getAllCountries = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/countries`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCountriesByContinent = (continentId: string | undefined) => {
  return axios
    .get(
      `${import.meta.env.VITE_API_URL}/api/countries/continent/${continentId}`,
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getAllCompanies = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCompaniesByCountry = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies/country/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCompaniesDetails = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getVansbyCompany = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/vans/companies/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getAllVans = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/vans`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getDetailsVan = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/vans/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export {
  getAllCountries,
  getAllVans,
  getCountriesByContinent,
  getAllContinents,
  getCompaniesByCountry,
  getCompaniesDetails,
  getVansbyCompany,
  getDetailsVan,
  getAllCompanies,
};
