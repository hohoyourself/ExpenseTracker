-- January
CREATE TABLE IF NOT EXISTS entry202301 LIKE entry;
INSERT INTO entry202301(day, cat, comment, amount) VALUES 
(1, 'meal', 'Meal at restaurant', 25.0), 
(3, 'trans', 'TTC fare', 3.0),
(5, 'gro', 'Groceries from Wal-Mart', 80.0), 
(7, 'leis', 'Go-karting', 70.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(12, 'admin', 'Textbooks', 200.0), 
(15, 'meal', 'Buffet with friends', 35.0), 
(17, 'trans', 'TTC fare', 3.0),
(19, 'shop', 'New watch', 120.0),
(21, 'app', 'Steam game', 20.0),
(23, 'meal', 'Meal at restaurant', 30.0), 
(25, 'trans', 'TTC fare', 3.0),
(27, 'gro', 'Groceries from Loblaws', 90.0), 
(29, 'leis', 'Live concert', 60.0), 
(31, 'util', 'Internet bill', 50.0);
INSERT INTO avaMonth (month) VALUES (202301);

-- February
CREATE TABLE IF NOT EXISTS entry202302 LIKE entry;
INSERT INTO entry202302(day, cat, comment, amount) VALUES 
(1, 'meal', 'Meal at restaurant', 35.0), 
(3, 'trans', 'Uber ride', 15.0),
(5, 'gro', 'Groceries from FreshCo', 90.0), 
(7, 'leis', 'Bowling', 20.0), 
(10, 'util', 'Mobile phone bill', 50.0),
(12, 'admin', 'Printout costs', 8.0), 
(15, 'meal', 'Buffet with friends', 40.0), 
(17, 'trans', 'TTC fare', 3.0),
(18, 'shop', 'New shoes', 75.0),
(20, 'app', 'Spotify subscription', 10.0),
(22, 'meal', 'Meal at restaurant', 28.0), 
(24, 'trans', 'Taxi ride', 18.0),
(26, 'gro', 'Groceries from Wal-Mart', 95.0), 
(28, 'leis', 'Movie', 15.0), 
(30, 'util', 'Internet bill', 55.0);
INSERT INTO avaMonth (month) VALUES (202302);

-- March
CREATE TABLE IF NOT EXISTS entry202303 LIKE entry;
INSERT INTO entry202303(day, cat, comment, amount) VALUES 
(1, 'meal', 'Restaurant dinner', 40.0), 
(3, 'trans', 'TTC fare', 3.0),
(5, 'gro', 'Whole Foods groceries', 100.0), 
(7, 'app', 'Microsoft 365 Subscription', 10.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(13, 'leis', 'Movie night', 15.0), 
(15, 'meal', 'Pizza with friends', 20.0), 
(17, 'trans', 'TTC fare', 3.0),
(20, 'shop', 'Winter clothing', 180.0),
(22, 'admin', 'Notebooks and pens', 15.0),
(25, 'meal', 'Restaurant lunch', 35.0), 
(27, 'trans', 'Uber ride', 12.0),
(29, 'util', 'Electricity bill', 60.0), 
(30, 'leis', 'Music concert', 80.0);
INSERT INTO avaMonth (month) VALUES (202303);

-- April
CREATE TABLE IF NOT EXISTS entry202304 LIKE entry;
INSERT INTO entry202304(day, cat, comment, amount) VALUES 
(1, 'meal', 'Sushi lunch', 25.0), 
(4, 'trans', 'TTC fare', 3.0),
(6, 'gro', 'No Frills groceries', 85.0),
(8, 'app', 'Adobe Creative Suite', 20.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(12, 'leis', 'Bowling', 30.0), 
(15, 'meal', 'Burger King meal', 15.0), 
(17, 'trans', 'TTC fare', 3.0),
(20, 'shop', 'Mobile Phone', 800.0),
(22, 'admin', 'Printout costs', 8.0),
(25, 'meal', 'Steak dinner', 50.0), 
(27, 'trans', 'TTC fare', 3.0),
(29, 'util', 'Internet bill', 60.0), 
(30, 'leis', 'Theme park visit', 40.0);
INSERT INTO avaMonth (month) VALUES (202304);

-- May
CREATE TABLE IF NOT EXISTS entry202305 LIKE entry;
INSERT INTO entry202305(day, cat, comment, amount) VALUES 
(1, 'meal', 'Brunch at café', 20.0), 
(3, 'trans', 'TTC fare', 3.0),
(5, 'gro', 'Loblaws groceries', 90.0), 
(7, 'leis', 'Netflix Subscription', 13.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(13, 'admin', 'Summer course material', 100.0), 
(15, 'meal', 'Chinese takeout', 35.0), 
(17, 'trans', 'TTC fare', 3.0),
(20, 'shop', 'New shoes', 70.0),
(22, 'meal', 'Fast food', 10.0),
(25, 'meal', 'Indian restaurant', 25.0), 
(27, 'trans', 'Uber to party', 15.0),
(29, 'util', 'Electricity bill', 60.0), 
(30, 'leis', 'Cinema', 15.0);
INSERT INTO avaMonth (month) VALUES (202305);

-- June
CREATE TABLE IF NOT EXISTS entry202306 LIKE entry;
INSERT INTO entry202306(day, cat, comment, amount) VALUES 
(1, 'meal', 'Coffee at Starbucks', 5.0), 
(3, 'trans', 'TTC fare', 3.0),
(5, 'gro', 'Groceries from FreshCo', 75.0), 
(7, 'app', 'Coursera subscription', 39.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(13, 'leis', 'Summer music festival', 70.0), 
(15, 'meal', 'Dinner with friends', 50.0), 
(17, 'shop', 'Summer clothing', 100.0),
(20, 'trans', 'Uber to airport', 40.0),
(22, 'admin', 'Printout costs', 8.0),
(25, 'meal', 'BBQ supplies', 60.0), 
(27, 'util', 'Internet bill', 55.0),
(29, 'leis', 'Netflix Subscription', 13.0), 
(30, 'trans', 'TTC fare', 3.0);
INSERT INTO avaMonth (month) VALUES (202306);

-- July
CREATE TABLE IF NOT EXISTS entry202307 LIKE entry;
INSERT INTO entry202307(day, cat, comment, amount) VALUES 
(1, 'meal', 'Meal at restaurant', 30.0), 
(3, 'trans', 'TTC fare', 3.0),
(5, 'gro', 'Groceries from Loblaws', 85.0), 
(7, 'leis', 'Movie', 15.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(12, 'admin', 'Stationeries', 15.0), 
(15, 'meal', 'Pizza with friends', 20.0), 
(17, 'shop', 'New shoes', 100.0),
(20, 'app', 'Cloud storage upgrade', 2.0),
(22, 'trans', 'TTC fare', 3.0),
(25, 'meal', 'Meal at restaurant', 28.0), 
(27, 'util', 'Internet bill', 50.0),
(29, 'leis', 'Sports event', 25.0), 
(31, 'trans', 'TTC fare', 3.0);
INSERT INTO avaMonth (month) VALUES (202307);

-- August
CREATE TABLE IF NOT EXISTS entry202308 LIKE entry;
INSERT INTO entry202308(day, cat, comment, amount) VALUES 
(2, 'meal', 'Meal at restaurant', 25.0), 
(4, 'trans', 'TTC fare', 3.0),
(6, 'gro', 'Groceries from No Frills', 80.0), 
(8, 'leis', 'Theme Park', 70.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(12, 'admin', 'Printout costs', 8.0), 
(15, 'meal', 'Burger King meal', 10.0), 
(16, 'trans', 'TTC fare', 3.0),
(18, 'shop', 'New outfit', 75.0),
(20, 'app', 'LinkedIn Premium', 30.0),
(22, 'meal', 'Meal at restaurant', 35.0), 
(25, 'trans', 'TTC fare', 3.0),
(27, 'util', 'Internet bill', 55.0), 
(30, 'leis', 'Movie', 12.0);
INSERT INTO avaMonth (month) VALUES (202308);

-- September
CREATE TABLE IF NOT EXISTS entry202309 LIKE entry;
INSERT INTO entry202309(day, cat, comment, amount) VALUES 
(1, 'meal', 'Coffee at Starbucks', 5.0), 
(3, 'trans', 'TTC fare', 3.0),
(5, 'gro', 'Groceries from Wal-Mart', 90.0), 
(7, 'app', 'Microsoft 365 Subscription', 10.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(13, 'leis', 'Movie night', 15.0), 
(15, 'meal', 'Pizza with friends', 20.0), 
(17, 'shop', 'New Laptop', 800.0),
(20, 'admin', 'University Study supplies', 60.0),
(22, 'meal', 'Fast food', 10.0),
(25, 'trans', 'TTC fare', 3.0), 
(27, 'util', 'Internet bill', 55.0),
(29, 'leis', 'Party', 50.0),
(30, 'app', 'Adobe Creative Suite', 20.0);
INSERT INTO avaMonth (month) VALUES (202309);

-- October
CREATE TABLE IF NOT EXISTS entry202310 LIKE entry;
INSERT INTO entry202310(day, cat, comment, amount) VALUES 
(2, 'meal', 'Meal at restaurant', 30.0), 
(4, 'trans', 'TTC fare', 3.0),
(6, 'gro', 'Groceries from Costco', 110.0), 
(8, 'leis', 'Halloween party', 50.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(12, 'admin', 'Printout costs', 10.0), 
(15, 'meal', 'Buffet with friends', 40.0), 
(16, 'trans', 'TTC fare', 3.0),
(18, 'shop', 'New jacket', 120.0),
(20, 'app', 'Cloud storage subscription', 10.0),
(22, 'meal', 'Meal at restaurant', 33.0), 
(25, 'trans', 'TTC fare', 3.0),
(27, 'gro', 'Groceries from Loblaws', 90.0), 
(29, 'leis', 'Theatre show', 50.0), 
(31, 'util', 'Internet bill', 50.0);
INSERT INTO avaMonth (month) VALUES (202310);

-- November
CREATE TABLE IF NOT EXISTS entry202311 LIKE entry;
INSERT INTO entry202311(day, cat, comment, amount) VALUES 
(2, 'meal', 'Meal at restaurant', 25.0), 
(4, 'trans', 'TTC fare', 3.0),
(6, 'gro', 'Groceries from Wal-Mart', 80.0), 
(8, 'leis', 'Movie', 15.0), 
(10, 'util', 'Mobile phone bill', 45.0),
(12, 'admin', 'Printout costs', 10.0), 
(15, 'meal', 'Buffet with friends', 35.0), 
(16, 'trans', 'TTC fare', 3.0),
(18, 'shop', 'New headphones', 100.0),
(20, 'app', 'Windows software', 25.0);
INSERT INTO avaMonth (month) VALUES (202311);