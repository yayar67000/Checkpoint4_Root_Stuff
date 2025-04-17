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

type VansCardProps = {
  van: VansData;
  favoriteVan?: FavoriteVansData;
  isFavorite: boolean;
  onAddFavorite: (vanId: number) => void;
  onRemoveFavorite: (favoriteVanId: number) => void;
};

interface FavoriteVansData {
  id: number;
  roadie_id: number;
  van_id: number;
  name: string;
  picture: string;
  number_plate: string;
  fuel: string;
  lbs: string;
  brand: string;
  company_id: number;
}
