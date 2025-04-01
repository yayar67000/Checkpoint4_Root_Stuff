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
      };
      auth: {
        email: string;
        password: string;
        isAdmin: boolean;
      };
      roadie: {
        id: number;
      };
    }
  }
}
