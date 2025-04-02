interface ContinentData {
  id: number;
  name: string;
  picture: string;
}

interface ContinentDataProps {
  continent: ContinentData;
}

interface CountriesData {
  id: number;
  name: string;
  picture: string;
  continent_id: number;
}

interface CountriesDataProps {
  country: CountriesData;
}
