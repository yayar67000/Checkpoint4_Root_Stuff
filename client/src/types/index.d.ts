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

interface CompaniesByCountryData {
  id: number;
  name: string;
  description: string;
  address: string;
  logo: string;
  country_id: number;
}

interface CompaniesByCountryDataProps {
  company: CompaniesByCountryData;
}

interface CompaniesDetailData {
  id: number;
  name: string;
  description: string;
  address: string;
  logo: string;
  country_id: number;
}

interface VansData {
  id: number;
  name: string;
  number_plate: string;
  picture: string;
  fuel: string;
  lbs: string;
  brand: string;
  company_id: number;
}

interface VansByCompanyData {
  id: number;
  name: string;
  number_plate: string;
  picture: string;
  fuel: string;
  lbs: string;
  brand: string;
  company_id: number;
}

interface VansDataProps {
  van: VansData;
}
