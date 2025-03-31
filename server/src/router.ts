import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import companyActions from "./modules/company/companyActions";
import continentActions from "./modules/continent/continentActions";
import countryActions from "./modules/country/countryActions";
import itemActions from "./modules/item/itemActions";
import vanActions from "./modules/van/vanActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* *****************COMPANIES************************** */
router.get("/api/companies", companyActions.browse);
router.get("/api/companies/:id", companyActions.read);
router.post("/api/companies", companyActions.add);
router.put("/api/companies/:id", companyActions.edit);
router.delete("/api/companies/:id", companyActions.destroy);

/* *****************VAN************************** */
router.get("/api/vans", vanActions.browse);
router.get("/api/vans/:id", vanActions.read);
router.post("/api/vans", vanActions.add);
router.put("/api/vans/:id", vanActions.edit);
router.delete("/api/vans/:id", vanActions.destroy);

/* *****************COUNTRIES************************** */

router.get("/api/countries", countryActions.browse);
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

export default router;
