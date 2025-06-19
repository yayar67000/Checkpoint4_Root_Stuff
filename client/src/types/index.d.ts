interface FavoriteContextProps {
  favoriteVans: FavoriteVansData[];
  isFavorite: (vanId: number) => boolean;
  addToFavorites: (vanId: number) => Promise<void>;
  removeFromFavorites: (vanId: number) => Promise<void>;
}

interface ReservedVanContextProps {
  reservedVans: ReservedVansData[];
  isReserved: (vanId: number) => boolean;
  addToReserved: (
    vanId: number,
    startDate: string,
    endDate: string,
  ) => Promise<void>;
  removeFromReserved: (vanId: number) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
  userName: string;
  setUserName: (userName: string) => void;
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

type VansCardProps = {
  van: VansData;
  isFavorite?: boolean;
  onAddFavorite?: (vanId: number) => Promise<void>;
  onRemoveFavorite?: (favoriteVanId: number) => Promise<void>;
};
type ReservedVansCardProps = {
  reservedVan: ReservedVansData;
  isReserved?: boolean;
  onAddReserved?: (
    reservedVanId: number,
    startDate: string,
    endDate: string,
  ) => Promise<void>;
  onRemoveReserved?: (reservedVanId: number) => Promise<void>;
};

interface ReservedVansData {
  id: number;
  start_date: string;
  end_date: string;
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
