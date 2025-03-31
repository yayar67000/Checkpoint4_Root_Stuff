CREATE TABLE continent (
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  picture TEXT NOT NULL
);

CREATE TABLE country (
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  picture TEXT NOT NULL,
  continent_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (continent_id) REFERENCES continent(id)
);

CREATE TABLE company (
   id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   description TEXT NOT NULL,
   address VARCHAR(100) NOT NULL,
   logo TEXT NOT NULL,
   country_id INT UNSIGNED NOT NULL,
   FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE van (
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  number_plate VARCHAR(100) NOT NULL,
  picture VARCHAR(100) NOT NULL,
  fuel VARCHAR(100) NOT NULL,
  lbs TEXT NOT NULL,  
  brand VARCHAR(100) NOT NULL,
  company_id INT UNSIGNED NOT NULL,  
  FOREIGN KEY (company_id) REFERENCES company(id) 
);

-- Insertion des continents
INSERT INTO continent (name, picture) VALUES
("Europe", "images/europe.jpg"),
("Asia",  "images/asia.jpg"),
("Africa", "images/africa.jpg"),
("Amérique du Nord", "images/north_america.jpg"),
("Amérique du Sud", "images/south_america.jpg"),
("Océanie", "images/australia.jpg");

-- Insertion des pays 
INSERT INTO country (name, picture, continent_id) VALUES
("France", "images/france.jpg", 1),
("Allemagne", "images/germany.jpg", 1),
("Espagne", "images/spain.jpg", 1),
("Italie", "images/italy.jpg", 1),
("Royaume Uni", "images/uk.jpg", 1),
("Chine", "images/china.jpg", 2),
("Japon", "images/japan.jpg", 2),
("Inde", "images/india.jpg", 2),
("Corée du Sud", "images/south_korea.jpg", 2),
("Indonésie", "images/indonesia.jpg", 2),
("Nigeria", "images/nigeria.jpg", 3),
("Afrique du Sud", "images/south_africa.jpg", 3),
("Égypte", "images/egypt.jpg", 3),
("Kenya", "images/kenya.jpg", 3),
("Algérie", "images/algeria.jpg", 3),
("USA", "images/usa.jpg", 4),
("Canada", "images/canada.jpg", 4),
("Mexique", "images/mexico.jpg", 4),
("Brésil", "images/brazil.jpg", 5),
("Argentine", "images/argentina.jpg", 5),
("Chili", "images/chile.jpg", 5),
("Pérou", "images/peru.jpg", 5),
("Australie", "images/australia.jpg", 6),
("Nouvelle Zélande", "images/new_zealand.jpg", 6);

-- Insertion des entreprises
INSERT INTO company (name, description, address, logo, country_id) VALUES
("Vans4U", "Location de vans pour particuliers et entreprises dans toute l'Europe", "123 Rent St, Paris, France", "logos/vans4u_logo.png", 1),
("GoVans", "Service de location de vans et de véhicules utilitaires à travers les États-Unis", "456 Van Lane, Los Angeles, USA", "logos/govans_logo.png", 1),
("VansRUs", "Spécialiste de la location de vans et camions pour déménagement et road trips", "789 Van Blvd, Sydney, Australie", "logos/vansrus_logo.png", 10),
("VanRentals UK", "Location de vans et de véhicules à louer pour les vacances et les entreprises au Royaume-Uni", "101 Van Street, Londres, Royaume-Uni", "logos/vanrentals_uk_logo.png", 2),
("Véhicules Express", "Location rapide de vans pour transport de marchandises en France", "204 Cargo Road, Lyon, France", "logos/vehiculesexpress_logo.png", 1),
("VansLoc", "Vente et location de vans pour les professionnels et les voyageurs", "325 Street Rental, Toronto, Canada", "logos/vansloc_logo.png", 8),
("RentMyVan", "Location de vans tout équipés pour road trips et déplacements professionnels", "500 Rental Ave, Berlin, Allemagne", "logos/rentmyvan_logo.png", 2),
("VanGo", "Location de vans et de fourgonnettes pour les petits et moyens déplacements", "876 Van Road, Barcelona, Espagne", "logos/vango_logo.png", 4),
("RoadVan", "Louez des vans de qualité pour vos voyages et déménagements en Italie", "654 Road Blvd, Rome, Italie", "logos/roadvan_logo.png", 3),
("UrbanVan Hire", "Location de vans électriques et écologiques pour la ville", "998 Urban St, New York, USA", "logos/urbanvan_hire_logo.png", 1);

-- Insertion des véhicules
INSERT INTO van (name, number_plate, picture, fuel, lbs, brand, company_id) VALUES
("VanTech 2000", "AB-123-CD", "vans/van_tech_2000.jpg", "Diesel", "2500", "TechAuto", 1),
("AutoVan X1", "XY-456-ZT", "vans/auto_van_x1.jpg", "Electric", "1500", "AutoGlobal", 2),
("AsiaVan Express", "JK-789-LM", "vans/asia_van_express.jpg", "Gasoline", "1800", "AsiaTech", 3),
("AfricaVan Pro", "FG-123-QW", "vans/africa_van_pro.jpg", "Diesel", "2200", "Africa Industries", 4),
("EcoVan 300", "GH-321-JK", "vans/eco_van_300.jpg", "Electric", "1200", "GreenTech Solutions", 5),
("LuxVan 5000", "LM-555-VX", "vans/lux_van_5000.jpg", "Hybrid", "2800", "EuroCars Manufacturing", 6),
("SmartVan X2", "RT-789-XY", "vans/smart_van_x2.jpg", "Electric", "1400", "TechMovers", 7),
("DesertVan Elite", "AZ-234-PQ", "vans/desert_van_elite.jpg", "Diesel", "3500", "Desert Motors", 8),
("UrbanRide V1", "EF-567-TY", "vans/urban_ride_v1.jpg", "Electric", "1300", "UrbanDrive", 9),
("HeavyHaul 700", "PR-876-LK", "vans/heavyhaul_700.jpg", "Diesel", "4500", "NovaIndustries", 10);