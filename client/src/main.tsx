// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

import { AuthProvider } from "./services/AuthContext";
import { FavoriteProvider } from "./services/FavoriteContext";

// Import pages
import Companies from "./pages/Companies/Companies";
import CompaniesByCountry from "./pages/CompaniesByCountry/CompaniesByCountry";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import Continents from "./pages/Continents/Continents";
import Countries from "./pages/Countries/Countries";
import CountriesByContinent from "./pages/CountriesByContinent/CountriesByContinent";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import RoadieInformation from "./pages/RoadieInformation/RoadieInformation";
import Vans from "./pages/Vans/Vans";
import VansDetails from "./pages/VansDetails/VansDetails";

// Import requests

import {
  getAllCompanies,
  getAllContinents,
  getAllCountries,
  getAllVans,
  getCompaniesByCountry,
  getCompaniesDetails,
  getCountriesByContinent,
  getDetailsVan,
  getFavoriteVans,
  getGeneralRoadiesDetails,
  getReservedVan,
  getRoadieAuth,
  getVansbyCompany,
} from "./services/requests";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const continents = await getAllContinents();
          const countries = await getAllCountries();
          const companies = await getAllCompanies();
          const vans = await getAllVans();
          return { continents, countries, companies, vans };
        },
      },
      {
        path: "/companies",
        element: <Companies />,
        loader: getAllCompanies,
      },
      {
        path: "/companyDetails/:id",
        element: <CompanyDetails />,
        loader: async ({ params }) => {
          const company = await getCompaniesDetails(params.id);
          const vans = await getVansbyCompany(params.id);
          return { company, vans };
        },
      },
      {
        path: "/companies/country/:countryId",
        element: <CompaniesByCountry />,
        loader: ({ params }) => getCompaniesByCountry(params.countryId),
      },
      {
        path: "/continents",
        element: <Continents />,
        loader: getAllContinents,
      },

      {
        path: "/countries",
        element: <Countries />,
      },
      {
        path: "/countries/continent/:continentId",
        element: <CountriesByContinent />,
        loader: ({ params }) => getCountriesByContinent(params.continentId),
      },
      {
        path: "/roadies/:id",
        element: <RoadieInformation />,
        loader: async ({ params }) => {
          const company = await getGeneralRoadiesDetails(params.id);
          const reservedVan = await getReservedVan;
          return { company, reservedVan };
        },
      },
      {
        path: "/vans",
        element: <Vans />,
        loader: getAllVans,
      },
      {
        path: "/vanDetails/:id",
        element: <VansDetails />,
        loader: async ({ params }) => {
          if (!params.id) {
            throw new Error("L'id du van est manquant !");
          }

          const vans = await getDetailsVan(params.id);
          const reservedVan = await getReservedVan();
          return { vans, reservedVan };
        },
      },
      {
        path: "/roadies/information",
        element: <RoadieInformation />,
        loader: async () => {
          const roadie = await getRoadieAuth();
          const favoriteVans = await getFavoriteVans();

          if (!roadie) {
            throw new Response("Unauthorized", { status: 401 });
          }

          return { roadie, favoriteVans };
        },
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
