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

var countries = [
  'Andorra', 'United Arab Emirates', 'Afghanistan', 'Antigua and Barbuda', 'Anguilla', 'Albania',
  'Armenia', 'Angola', 'Antarctica', 'Argentina', 'American Samoa', 'Austria', 'Australia', 'Aruba',
  'Åland Islands', 'Azerbaijan', 'Bosnia and Herzegovina', 'Barbados', 'Bangladesh', 'Belgium',
  'Burkina Faso', 'Bulgaria', 'Bahrain', 'Burundi', 'Benin', 'Saint Barthélemy', 'Bermuda',
  'Brunei Darussalam', 'Bolivia, Plurinational State of', 'Bonaire, Sint Eustatius and Saba',
  'Brazil', 'Bahamas', 'Bhutan', 'Bouvet Island', 'Botswana', 'Belarus', 'Belize', 'Canada',
  'Cocos (Keeling) Islands', 'Congo, the Democratic Republic of the', 'Central African Republic',
  'Congo', 'Switzerland', 'Côte d\'Ivoire', 'Cook Islands', 'Chile', 'Cameroon', 'China',
  'Colombia', 'Costa Rica', 'Cuba', 'Cabo Verde', 'Curaçao', 'Christmas Island', 'Cyprus',
  'Czechia', 'Germany', 'Djibouti', 'Denmark', 'Dominica', 'Dominican Republic', 'Algeria',
  'Ecuador', 'Estonia', 'Egypt', 'Western Sahara', 'Eritrea', 'Spain', 'Ethiopia', 'Finland',
  'Fiji', 'Falkland Islands (Malvinas)', 'Micronesia, Federated States of', 'Faroe Islands',
  'France', 'Gabon', 'United Kingdom of Great Britain and Northern Ireland', 'Grenada', 'Georgia',
  'French Guiana', 'Guernsey', 'Ghana', 'Gibraltar', 'Greenland', 'Gambia', 'Guinea', 'Guadeloupe',
  'Equatorial Guinea', 'Greece', 'South Georgia and the South Sandwich Islands', 'Guatemala',
  'Guam', 'Guinea-Bissau', 'Guyana', 'Hong Kong', 'Heard Island and McDonald Islands', 'Honduras',
  'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'Ireland', 'Israel', 'Isle of Man', 'India',
  'British Indian Ocean Territory', 'Iraq', 'Iran, Islamic Republic of', 'Iceland', 'Italy',
  'Jersey', 'Jamaica', 'Jordan', 'Japan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'Comoros',
  'Saint Kitts and Nevis', 'Korea, Democratic People\'s Republic of', 'Korea, Republic of',
  'Kuwait', 'Cayman Islands', 'Kazakhstan', 'Lao People\'s Democratic Republic', 'Lebanon',
  'Saint Lucia', 'Liechtenstein', 'Sri Lanka', 'Liberia', 'Lesotho', 'Lithuania', 'Luxembourg',
  'Latvia', 'Libya', 'Morocco', 'Monaco', 'Moldova, Republic of', 'Montenegro',
  'Saint Martin (French part)', 'Madagascar', 'Marshall Islands', 'North Macedonia', 'Mali',
  'Myanmar', 'Mongolia', 'Macao', 'Northern Mariana Islands', 'Martinique', 'Mauritania',
  'Montserrat', 'Malta', 'Mauritius', 'Maldives', 'Malawi', 'Mexico', 'Malaysia', 'Mozambique',
  'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island', 'Nigeria', 'Nicaragua', 'Netherlands',
  'Norway', 'Nepal', 'Nauru', 'Niue', 'New Zealand', 'Oman', 'Panama', 'Peru', 'French Polynesia',
  'Papua New Guinea', 'Philippines', 'Pakistan', 'Poland', 'Saint Pierre and Miquelon', 'Pitcairn',
  'Puerto Rico', 'Palestine, State of', 'Portugal', 'Palau', 'Paraguay', 'Qatar', 'Réunion',
  'Romania', 'Serbia', 'Russian Federation', 'Rwanda', 'Saudi Arabia', 'Solomon Islands',
  'Seychelles', 'Sudan', 'Sweden', 'Singapore', 'Saint Helena, Ascension and Tristan da Cunha',
  'Slovenia', 'Svalbard and Jan Mayen', 'Slovakia', 'Sierra Leone', 'San Marino', 'Senegal',
  'Somalia', 'Suriname', 'South Sudan', 'Sao Tome and Principe', 'El Salvador',
  'Sint Maarten (Dutch part)', 'Syrian Arab Republic', 'Eswatini', 'Turks and Caicos Islands',
  'Chad', 'French Southern Territories', 'Togo', 'Thailand', 'Tajikistan', 'Tokelau', 'Timor-Leste',
  'Turkmenistan', 'Tunisia', 'Tonga', 'Turkey', 'Trinidad and Tobago', 'Tuvalu',
  'Taiwan, Province of China', 'Tanzania, United Republic of', 'Ukraine', 'Uganda',
  'United States Minor Outlying Islands', 'United States of America', 'Uruguay', 'Uzbekistan',
  'Holy See', 'Saint Vincent and the Grenadines', 'Venezuela, Bolivarian Republic of',
  'Virgin Islands, British', 'Virgin Islands, U.S.', 'Viet Nam', 'Vanuatu', 'Wallis and Futuna',
  'Samoa', 'Yemen', 'Mayotte', 'South Africa', 'Zambia', 'Zimbabwe'
];

var countryCodes = [
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ',
  'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS',
  'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN',
  'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE',
  'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF',
  'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM',
  'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM',
  'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC',
  'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK',
  'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA',
  'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG',
  'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW',
  'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS',
  'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO',
  'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI',
  'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
];

var colors = [
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
  'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
  'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan',
  'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
  'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
  'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray',
  'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
  'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo',
  'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue',
  'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink',
  'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow',
  'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue',
  'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen',
  'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
  'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
  'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
  'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue',
  'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
  'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato',
  'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'
];

var lorem = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'morbi',
  'vulputate', 'eros', 'ut', 'mi', 'laoreet', 'viverra', 'nunc', 'lacinia', 'non', 'condimentum',
  'aenean', 'lacus', 'nisl', 'auctor', 'at', 'tortor', 'ac', 'fringilla', 'sodales', 'pretium',
  'quis', 'iaculis', 'in', 'aliquam', 'ultrices', 'felis', 'accumsan', 'ornare', 'etiam',
  'elementum', 'aliquet', 'finibus', 'maecenas', 'dignissim', 'vel', 'blandit', 'placerat', 'sed',
  'tempor', 'ex', 'faucibus', 'velit', 'nam', 'erat', 'augue', 'quisque', 'nulla', 'maximus',
  'vitae', 'e', 'lobortis', 'euismod', 'tristique', 'metus', 'vehicula', 'purus', 'diam', 'mollis',
  'neque', 'eu', 'porttitor', 'mauris', 'a', 'risus', 'orci', 'tincidunt', 'scelerisque',
  'vestibulum', 'dui', 'ante', 'posuere', 'turpis', 'enim', 'cras', 'massa', 'cursus', 'suscipit',
  'tempus', 'facilisis', 'ultricies', 'i', 'eget', 'imperdiet', 'donec', 'arcu', 'ligula',
  'sagittis', 'hendrerit', 'justo', 'pellentesque', 'mattis', 'lacinia', 'leo', 'est', 'magna',
  'nibh', 'sem', 'natoque', 'consequat', 'proin', 'eti', 'commodo', 'rhoncus', 'dictum', 'id',
  'pharetra', 'sapien', 'gravida', 'sollicitudin', 'curabitur', 'au', 'nisi', 'bibendum', 'lectus',
  'et', 'pulvinar', 'it', 'o', 'cit', 'con', 'el', 'u', 'ali', 'dia', 'lum', 'tem', 'en'
];

module.exports = {
  titles: titles,
  firstNames: firstNames,
  lastNames: lastNames,
  companies: companies,
  tlds: tlds,
  streets: streets,
  cities: cities,
  countries: countries,
  countryCodes: countryCodes,
  colors: colors,
  lorem: lorem
};
