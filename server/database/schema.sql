CREATE TABLE continent (
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  countries VARCHAR(100) NOT NULL,
  picture TEXT NOT NULL
);

CREATE TABLE company (
   id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   description TEXT NOT NULL,
   address VARCHAR(100) NOT NULL,
   logo TEXT NOT NULL,
   continent_id INT UNSIGNED NOT NULL,  
   FOREIGN KEY (continent_id) REFERENCES continent(id)  
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
INSERT INTO continent (name, countries, picture) VALUES
("Europe", "France, Allemagne, Espagne, Italie, Royaume Uni", "images/europe.jpg"),
("Asia", "Chine, Japon, Inde, Corée du Sud, Indonesie", "images/asia.jpg"),
("Africa", "Nigeria, South_Africa, Egypt, Kenya, Algeria","images/africa.jpg"),
("Amérique du Nord", "USA, Canada, Mexico", "images/north_america.jpg"),
("Amérique du Sud", "Brésil, Argentine, Chili, Pérou", "images/south_america.jpg"),
("Océanie", "Australie, Nouvelle Zélande", "images/australia.jpg");

-- Insertion des entreprises
INSERT INTO company (name, description, address, logo, continent_id) VALUES
("TechCorp", "Une entreprise de technologie innovante", "123 Rue de la Tech, Paris, France", "logos/techcorp_logo.png", 1),
("AutoGlobal", "Fabricant de véhicules automobiles", "456 Avenue de l'Automobile, Berlin, Allemagne", "logos/autoglobal_logo.png", 1),
("AsiaTech", "Leader asiatique en matière de technologies", "789 Tech Street, Tokyo, Japon", "logos/asiatech_logo.png", 2),
("Africa Industries", "Industrie du développement en Afrique", "101 Industrial Rd, Lagos, Niger", "logos/africaindustries_logo.png", 3);

-- Insertion des véhicules
INSERT INTO van (name, number_plate, picture, fuel, lbs, brand, company_id) VALUES
("VanTech 2000", "AB-123-CD", "vans/van_tech_2000.jpg", "Diesel", "2500", "TechAuto", 1),
("AutoVan X1", "XY-456-ZT", "vans/auto_van_x1.jpg", "Electric", "1500", "AutoGlobal", 2),
("AsiaVan Express", "JK-789-LM", "vans/asia_van_express.jpg", "Gasoline", "1800", "AsiaTech", 3),
("AfricaVan Pro", "FG-123-QW", "vans/africa_van_pro.jpg", "Diesel", "2200", "Africa Industries", 4);