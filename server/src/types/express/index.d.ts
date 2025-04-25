// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      company: {
        id: number;
      };
      van: {
        id: number;
      };
      continent: {
        id: number;
      };
      country: {
        id: number;
      };
      user: {
        id: number;
        email: string;
        password: string;
        role: string;
        favoriteVanId?: number;
        firstname: string;
      };
      auth: {
        email: string;
        password: string;
        isAdmin: boolean;
      };
      roadie: {
        id: number;
      };
      resereved_van: {
        id: number;
        roadies_id: number;
        van_id: number;
        start_date: string;
        end_date: string;
      };
    }
  }
}
