var titles = [
  'Mr', 'Mrs', 'Dr', 'Prof', 'Lord', 'Lady', 'Sir', 'Madam'
];

var firstNames = [
  'Leanne', 'Edward', 'Haydee', 'Lyle', 'Shea', 'Curtis', 'Roselyn', 'Marcus', 'Lyn', 'Lloyd',
  'Isabelle', 'Francis', 'Olivia', 'Roman', 'Myong', 'Jamie', 'Alexis', 'Vernon', 'Chloe', 'Max',
  'Kirstie', 'Tyler', 'Katelin', 'Alejandro', 'Hannah', 'Gavin', 'Lynetta', 'Russell', 'Neida',
  'Kurt', 'Dannielle', 'Aiden', 'Janett', 'Vaughn', 'Michelle', 'Brian', 'Maisha', 'Theo', 'Emma',
  'Cedric', 'Jocelyn', 'Darrell', 'Grace', 'Ivan', 'Rikki', 'Erik', 'Madeleine', 'Rufus',
  'Florance', 'Raymond', 'Jenette', 'Danny', 'Kathy', 'Michael', 'Layla', 'Rolf', 'Selma', 'Anton',
  'Rosie', 'Craig', 'Victoria', 'Andy', 'Lorelei', 'Drew', 'Yuri', 'Miles', 'Raisa', 'Rico',
  'Rosanne', 'Cory', 'Dori', 'Travis', 'Joslyn', 'Austin', 'Haley', 'Ian', 'Liza', 'Rickey',
  'Susana', 'Stephen', 'Richelle', 'Lance', 'Jetta', 'Heath', 'Juliana', 'Rene', 'Madelyn', 'Stan',
  'Eleanore', 'Jason', 'Alexa', 'Adam', 'Jenna', 'Warren', 'Cecilia', 'Benito', 'Elaine', 'Mitch',
  'Raylene', 'Cyrus'
];

var lastNames = [
  'Flinn', 'Bryd', 'Milligan', 'Keesee', 'Mercer', 'Chapman', 'Zobel', 'Carter', 'Pettey',
  'Starck', 'Raymond', 'Pullman', 'Drolet', 'Higgins', 'Matzen', 'Tindel', 'Winter', 'Charley',
  'Schaefer', 'Hancock', 'Dampier', 'Garling', 'Verde', 'Lenihan', 'Rhymer', 'Pleiman', 'Dunham',
  'Seabury', 'Goudy', 'Latshaw', 'Whitson', 'Cumbie', 'Webster', 'Bourquin', 'Young', 'Rikard',
  'Brier', 'Luck', 'Porras', 'Gilmore', 'Turner', 'Sprowl', 'Rohloff', 'Magby', 'Wallis', 'Mullens',
  'Correa', 'Murphy', 'Connor', 'Gamble', 'Castleman', 'Pace', 'Durrett', 'Bourne', 'Hottle',
  'Oldman', 'Paquette', 'Stine', 'Muldoon', 'Smit', 'Finn', 'Kilmer', 'Sager', 'White', 'Friedrich',
  'Fennell', 'Miers', 'Carroll', 'Freeman', 'Hollis', 'Neal', 'Remus', 'Pickering', 'Woodrum',
  'Bradbury', 'Caffey', 'Tuck', 'Jensen', 'Shelly', 'Hyder', 'Krumm', 'Hundt', 'Seal', 'Pendergast',
  'Kelsey', 'Milling', 'Karst', 'Helland', 'Risley', 'Grieve', 'Paschall', 'Coolidge', 'Furlough',
  'Brandt', 'Cadena', 'Rebelo', 'Leath', 'Backer', 'Bickers', 'Cappel'
];

var companies = [
  'Unilogic', 'Solexis', 'Dalserve', 'Terrasys', 'Pancast', 'Tomiatech', 'Kancom', 'Iridimax',
  'Proline', 'Qualcore', 'Thermatek', 'VTGrafix', 'Sunopia', 'WestGate', 'Chromaton', 'Tecomix',
  'Galcom', 'Zatheon', 'OmniTouch', 'Hivemind', 'MultiServ', 'Citisys', 'Polygan', 'Dynaroc',
  'Storex', 'Britech', 'Thermolock', 'Cryptonica', 'LoopSys', 'ForeTrust', 'TrueXT', 'LexiconLabs',
  'Bellgate', 'Dynalab', 'Logico', 'Terralabs', 'CoreMax', 'Polycore', 'Infracom', 'Coolinga',
  'MultiLingua', 'Conixco', 'QuadNet', 'FortyFour', 'TurboSystems', 'Optiplex', 'Nitrocam',
  'CoreXTS', 'PeerSys', 'FastMart', 'Westercom', 'Templatek', 'Cirpria', 'FastFreight', 'Baramax',
  'Superwire', 'Celmax', 'Connic', 'Forecore', 'SmartSystems', 'Ulogica', 'Seelogic', 'DynaAir',
  'OpenServ', 'Maxcast', 'SixtySix', 'Protheon', 'SkyCenta', 'Eluxa', 'GrafixMedia', 'VenStrategy',
  'Keycast', 'Opticast', 'Cameratek', 'CorpTek', 'Sealine', 'Playtech', 'Anaplex', 'Hypervision',
  'Xenosys', 'Hassifix', 'Infratouch', 'Airconix', 'StrategyLine', 'Helixicon', 'MediaDime',
  'NitroSystems', 'Viewtopia', 'Cryosoft', 'DuoServe', 'Acousticom', 'Freecast', 'CoreRobotics',
  'Quadtek', 'Haltheon', 'TrioSys', 'Amsquare', 'Sophis', 'Keysoft', 'Creatonix'
];

var tlds = [
  'com', 'org', 'net', 'info', 'edu', 'gov', 'co', 'biz', 'name', 'me', 'mobi', 'club', 'xyz', 'eu'
];

var streets = [
  'Warner Street', 'Ceder Avenue', 'Glendale Road', 'Chester Square', 'Beechmont Parkway',
  'Carter Street', 'Hinton Road', 'Pitman Street', 'Winston Road', 'Cottontail Road',
  'Buckley Street', 'Concord Avenue', 'Clemont Street', 'Sleepy Lane', 'Bushey Crescent',
  'Randolph Street', 'Radcliffe Road', 'Canal Street', 'Ridgewood Drive', 'Highland Drive',
  'Orchard Road', 'Foster Walk', 'Walford Way', 'Harrington Crescent', 'Emmet Road',
  'Berkeley Street', 'Clarendon Street', 'Sherman Road', 'Mount Street', 'Hunter Street',
  'Pearl Street', 'Barret Street', 'Taylor Street', 'Shaftsbury Avenue', 'Paxton Street',
  'Park Avenue', 'Seaside Drive', 'Tavistock Place', 'Prospect Place', 'Harvard Avenue',
  'Elton Way', 'Green Street', 'Appleton Street', 'Banner Street', 'Piermont Drive', 'Brook Street',
  'Main Street', 'Fairmont Avenue', 'Arlington Road', 'Rutherford Street', 'Windsor Avenue',
  'Maple Street', 'Wandle Street', 'Grosvenor Square', 'Hunt Street', 'Haredale Road',
  'Glenn Drive', 'Mulholland Drive', 'Baker Street', 'Fuller Road', 'Coleman Avenue', 'Wall Street',
  'Robinson Street', 'Blakeley Street', 'Alexander Avenue', 'Gartland Street', 'Wooster Road',
  'Brentwood Drive', 'Colwood Place', 'Rivington Street', 'Bramble Lane', 'Hartswood Road',
  'Albion Place', 'Waverton Street', 'Sawmill Lane', 'Templeton Parkway', 'Hill Street',
  'Marsham Street', 'Stockton Lane', 'Lake Drive', 'Elm Street', 'Winchester Drive',
  'Crockett Street', 'High Street', 'Longford Crescent', 'Moreland Street', 'Sterling Street',
  'Golden Lane', 'Mercer Street', 'Dunstable Street', 'Chestnut Walk', 'Rutland Drive',
  'Buckfield Lane', 'Pembrooke Street', 'Tower Lane', 'Willow Avenue', 'Faraday Street',
  'Springfield Street', 'Crawford Street', 'Hudson Street'
];

var cities = [
  'Beaverton', 'Stanford', 'Baltimore', 'Newcastle', 'Halifax', 'Rockhampton', 'Coventry',
  'Medford', 'Boulder', 'Dover', 'Waterbury', 'Christchurch', 'Manchester', 'Perth', 'Norwich',
  'Redmond', 'Plymouth', 'Tacoma', 'Newport', 'Bradford', 'Aspen', 'Wellington', 'Oakland',
  'Norfolk', 'Durham', 'Portsmouth', 'Detroit', 'Portland', 'Northampton', 'Dayton', 'Charleston',
  'Irvine', 'Dallas', 'Albany', 'Petersburg', 'Melbourne', 'Southampton', 'Stafford', 'Bridgeport',
  'Fairfield', 'Dundee', 'Spokane', 'Oakleigh', 'Bristol', 'Sacramento', 'Sheffield', 'Lewisburg',
  'Miami', 'Brisbane', 'Denver', 'Kingston', 'Burwood', 'Rochester', 'Fresno', 'Cardiff',
  'Auckland', 'Sudbury', 'Hastings', 'Reno', 'Hillboro', 'Palmerston', 'Oxford', 'Hobart',
  'Atlanta', 'Wilmington', 'Vancouver', 'Youngstown', 'Hartford', 'London', 'Danbury', 'Birmingham',
  'Columbia', 'Dublin', 'Chicago', 'Toronto', 'Orlando', 'Toledo', 'Pheonix', 'Bakersfield',
  'Nottingham', 'Newark', 'Fargo', 'Walkerville', 'Exeter', 'Woodville', 'Greenville', 'Frankston',
  'Bangor', 'Seattle', 'Canterbury', 'Colchester', 'Boston', 'York', 'Cambridge', 'Brighton',
  'Lancaster', 'Adelaide', 'Cleveland', 'Telford', 'Richmond'
];

module.exports = {
  titles: titles,
  firstNames: firstNames,
  lastNames: lastNames,
  companies: companies,
  tlds: tlds,
  streets: streets,
  cities: cities
};
