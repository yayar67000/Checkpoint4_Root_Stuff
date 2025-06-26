"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Define item-related routes
const authActions_1 = __importDefault(require("./middlewares/authActions"));
const formReservedVan_1 = __importDefault(require("./middlewares/formReservedVan"));
const formRoadies_1 = __importDefault(require("./middlewares/formRoadies"));
const formVan_1 = __importDefault(require("./middlewares/formVan"));
const companyActions_1 = __importDefault(require("./modules/company/companyActions"));
const continentActions_1 = __importDefault(require("./modules/continent/continentActions"));
const countryActions_1 = __importDefault(require("./modules/country/countryActions"));
const favoriteVanActions_1 = __importDefault(require("./modules/favorite_van/favoriteVanActions"));
const reservedVanActions_1 = __importDefault(require("./modules/reserved_van/reservedVanActions"));
const roadiesActions_1 = __importDefault(require("./modules/roadies/roadiesActions"));
const vanActions_1 = __importDefault(require("./modules/van/vanActions"));
/* *****************LOGIN/LOGOUT************************** */
router.post("/api/login", authActions_1.default.login);
router.get("/api/logout", authActions_1.default.logout);
/* *****************COMPANIES************************** */
router.get("/api/companies", companyActions_1.default.browse);
router.get("/api/companies/country/:id", companyActions_1.default.browseByCountry);
router.get("/api/companies/:id", companyActions_1.default.read);
router.post("/api/companies", companyActions_1.default.add);
router.put("/api/companies/:id", companyActions_1.default.edit);
router.delete("/api/companies/:id", companyActions_1.default.destroy);
/* *****************VAN************************** */
router.get("/api/vans", vanActions_1.default.browse);
router.get("/api/vans/:id", vanActions_1.default.read);
router.get("/api/vans/companies/:id", vanActions_1.default.browseBYCompany);
router.post("/api/vans", authActions_1.default.verify, formVan_1.default.validate, vanActions_1.default.add);
router.put("/api/vans/:id", vanActions_1.default.edit);
router.delete("/api/vans/:id", vanActions_1.default.destroy);
/* *****************COUNTRIES************************** */
router.get("/api/countries", countryActions_1.default.browse);
router.get("/api/countries/continent/:id", countryActions_1.default.browseByContinent);
router.get("/api/countries/:id", countryActions_1.default.read);
router.post("/api/countries", countryActions_1.default.add);
router.put("/api/countries/:id", countryActions_1.default.edit);
router.delete("/api/countries/:id", countryActions_1.default.destroy);
/* *****************CONTINENT************************** */
router.get("/api/continents", continentActions_1.default.browse);
router.get("/api/continents/:id", continentActions_1.default.read);
router.post("/api/continents", continentActions_1.default.add);
router.put("/api/continents/:id", continentActions_1.default.edit);
router.delete("/api/continents/:id", continentActions_1.default.destroy);
/* *****************ROADIES************************ */
router.get("/api/roadies", roadiesActions_1.default.browse);
router.get("/api/authroadie", authActions_1.default.verify, roadiesActions_1.default.read);
router.get("/api/roadies/:id", roadiesActions_1.default.read);
router.get("/api/roadie/general-details/:id", roadiesActions_1.default.readGeneralDetails);
router.post("/api/roadies", formRoadies_1.default.validate, authActions_1.default.hashPassword, roadiesActions_1.default.add);
router.put("/api/roadies", authActions_1.default.verify, formRoadies_1.default.validateUpdate, roadiesActions_1.default.edit);
router.delete("/api/roadies/:id", authActions_1.default.verify, roadiesActions_1.default.destroy);
/* *****************FAVORITE_VAN************************ */
router.get("/api/favorite_van", authActions_1.default.verify, favoriteVanActions_1.default.readByRoadie);
router.post("/api/favorite_van", authActions_1.default.verify, favoriteVanActions_1.default.addFavoriteVan);
router.delete("/api/favorite_van/:id", authActions_1.default.verify, favoriteVanActions_1.default.destroyFavoriteVan);
/* *****************RESERVED_VAN************************ */
router.get("/api/reserved_van", authActions_1.default.verify, reservedVanActions_1.default.readByRoadie);
router.post("/api/reserved_van", authActions_1.default.verify, reservedVanActions_1.default.addReservedVan);
router.put("/api/reserved_van/:id", authActions_1.default.verify, formReservedVan_1.default.validate, reservedVanActions_1.default.edit);
router.delete("/api/reserved_van/:id", authActions_1.default.verify, reservedVanActions_1.default.destroyReservedVan);
exports.default = router;
