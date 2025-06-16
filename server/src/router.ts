import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import authActions from "./middlewares/authActions";
import formReservedVan from "./middlewares/formReservedVan";
import formRoadies from "./middlewares/formRoadies";
import formVan from "./middlewares/formVan";
import companyActions from "./modules/company/companyActions";
import continentActions from "./modules/continent/continentActions";
import countryActions from "./modules/country/countryActions";
import favoriteVanActions from "./modules/favorite_van/favoriteVanActions";
import reservedVanActions from "./modules/reserved_van/reservedVanActions";
import roadiesActions from "./modules/roadies/roadiesActions";
import vanActions from "./modules/van/vanActions";

/* *****************LOGIN/LOGOUT************************** */

router.post("/api/login", authActions.login);

router.get("/api/logout", authActions.logout);

/* *****************COMPANIES************************** */
router.get("/api/companies", companyActions.browse);
router.get("/api/companies/country/:id", companyActions.browseByCountry);
router.get("/api/companies/:id", companyActions.read);
router.post("/api/companies", companyActions.add);
router.put("/api/companies/:id", companyActions.edit);
router.delete("/api/companies/:id", companyActions.destroy);

/* *****************VAN************************** */
router.get("/api/vans", vanActions.browse);
router.get("/api/vans/:id", vanActions.read);
router.get("/api/vans/companies/:id", vanActions.browseBYCompany);
router.post("/api/vans", authActions.verify, formVan.validate, vanActions.add);
router.put("/api/vans/:id", vanActions.edit);
router.delete("/api/vans/:id", vanActions.destroy);

/* *****************COUNTRIES************************** */

router.get("/api/countries", countryActions.browse);
router.get("/api/countries/continent/:id", countryActions.browseByContinent);
router.get("/api/countries/:id", countryActions.read);
router.post("/api/countries", countryActions.add);
router.put("/api/countries/:id", countryActions.edit);
router.delete("/api/countries/:id", countryActions.destroy);

/* *****************CONTINENT************************** */

router.get("/api/continents", continentActions.browse);
router.get("/api/continents/:id", continentActions.read);
router.post("/api/continents", continentActions.add);
router.put("/api/continents/:id", continentActions.edit);
router.delete("/api/continents/:id", continentActions.destroy);

/* *****************ROADIES************************ */

router.get("/api/roadies", roadiesActions.browse);
router.get("/api/authroadie", authActions.verify, roadiesActions.read);
router.get("/api/roadies/:id", roadiesActions.read);
router.get(
  "/api/roadie/general-details/:id",
  roadiesActions.readGeneralDetails,
);
router.post(
  "/api/roadies",
  formRoadies.validate,
  authActions.hashPassword,
  roadiesActions.add,
);
router.put(
  "/api/roadies",
  authActions.verify,
  formRoadies.validateUpdate,
  roadiesActions.edit,
);
router.delete("/api/roadies/:id", authActions.verify, roadiesActions.destroy);

/* *****************FAVORITE_VAN************************ */

router.get(
  "/api/favorite_van",
  authActions.verify,
  favoriteVanActions.readByRoadie,
);
router.post(
  "/api/favorite_van",
  authActions.verify,
  favoriteVanActions.addFavoriteVan,
);
router.delete(
  "/api/favorite_van/:id",
  authActions.verify,
  favoriteVanActions.destroyFavoriteVan,
);

/* *****************RESERVED_VAN************************ */

router.get(
  "/api/reserved_van/:id",
  authActions.verify,
  reservedVanActions.readByRoadie,
);

router.post(
  "/api/reserved_van",
  authActions.verify,
  reservedVanActions.addReservedVan,
);

router.put(
  "/api/reserved_van/:id",
  authActions.verify,
  formReservedVan.validate,
  reservedVanActions.edit,
);

router.delete(
  "/api/reserved_van/:id",
  authActions.verify,
  reservedVanActions.destroyReservedVan,
);

export default router;
