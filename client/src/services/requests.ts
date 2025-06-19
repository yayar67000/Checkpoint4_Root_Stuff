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

const getRoadieAuth = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/authroadie`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getGeneralRoadiesDetails = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/roadie/general-details/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getFavoriteVans = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/favorite_van`, {
      withCredentials: true,
    })
    .then((response) => response.data || [])
    .catch((error) => console.error(error));
};

const addFavoriteVan = async (vanId: number) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/favorite_van`,
    { van_id: vanId },
    { withCredentials: true },
  );
};

const removeFavoriteVan = async (favoriteVanId: number) => {
  return axios.delete(
    `${import.meta.env.VITE_API_URL}/api/favorite_van/${favoriteVanId}`,
    { withCredentials: true },
  );
};

const getReservedVan = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/reserved_van`, {
      withCredentials: true,
    })
    .then((response) => response.data || [])
    .catch((error) => console.error(error));
};

const getReservedVanById = (reservedVanId: number) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/reserved_van/${reservedVanId}`, {
      withCredentials: true,
    })
    .then((response) => response.data || [])
    .catch((error) => console.error(error));
};

const addReservedVan = async ({
  van_id,
  start_date,
  end_date,
}: { van_id: number; start_date: string; end_date: string }) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/reserved_van`,
    { van_id, start_date, end_date },
    { withCredentials: true },
  );
};

const deleteReservedVan = async (reservedVanId: number) => {
  return axios.delete(
    `${import.meta.env.VITE_API_URL}/api/reserved_van/${reservedVanId}`,
    { withCredentials: true },
  );
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
  getReservedVanById,
  getRoadieAuth,
  getReservedVan,
  getGeneralRoadiesDetails,
  getFavoriteVans,
  addFavoriteVan,
  addReservedVan,
  removeFavoriteVan,
  deleteReservedVan,
};
