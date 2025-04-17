interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
}

type LoginRoadieProps = {
  isOpen: boolean;
  onClose: () => void;
};

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

interface RoadieData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  updated_at: string;
}

interface SvgTypes {
  path: string;
  width: string;
  height: string;
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

interface FavoriteVansData {
  id: number;
  van_id: number;
  roadie_id: number;
  van_name: string;
  van_picture: string;
  van_number_plate: string;
  van_fuel: string;
  van_lbs: string;
  van_brand: string;
  van_company_id: number;
}
