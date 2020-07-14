import fecha from 'fecha';
import numbro from 'numbro';

interface DefaultMockdata {
  titles: string[];
  firstNames: string[];
  lastNames: string[];
  companies: string[];
  tlds: string[];
  streets: string[];
  cities: string[];
  countries: string[];
  countryCodes: string[];
  colors: string[];
  lorem: string[];
}

interface DefaultHelpers {
  repeat(min: number, max?: number, options?: any): string;
  int(min: number, max: number, format?: string, options?: any): string;
  float(min: number, max: number, format?: string, options?: any): string;
  boolean(options?: any): string;
  date(min: string, max: string, format?: string, options?: any): string;
  time(min: string, max: string, format?: string, options?: any): string;
  title(options?: any): string;
  firstName(options?: any): string;
  lastName(options?: any): string;
  username(options?: any): string;
  company(options?: any): string;
  tld(options?: any): string;
  domain(options?: any): string;
  email(options?: any): string;
  street(options?: any): string;
  city(options?: any): string;
  country(options?: any): string;
  countryCode(options?: any): string;
  zipcode(options?: any): string;
  postcode(options?: any): string;
  lat(options?: any): string;
  long(options?: any): string;
  phone(format?: string, options?: any): string;
  guid(options?: any): string;
  ipv4(options?: any): string;
  ipv6(options?: any): string;
  color(options?: any): string;
  hexColor(options?: any): string;
  char(charset: string, options?: any): string;
  lorem(totalWords: number, options?: any): string;
  random(...items: (string | number)[]): string;
  lowercase(value: any): string;
  uppercase(value: any): string;
  add(a: number, b: number): string;
  step(inc: number, options?: any): string;
}

interface Utils {
  setRandomSeed(seed: string): void;
  random(): number;
  randomInt(min: number, max: number): number;
  randomFloat(min: number, max: number): number;
  randomBoolean(): boolean;
  randomDate(min: number, max: number): Date;
  randomArrayItem(array: any[]): any;
  randomChar(chartset?: string): string;
}

export interface ParseOptions {
  mockdata?: Record<string, any>;
  helpers?: Record<string, any>;
  partials?: Record<string, any>;
  seed?: string;
}

declare const dummyjson: {
  seed: string;
  parse(string: string, options?: ParseOptions): string;
  mockdata: DefaultMockdata;
  helpers: DefaultHelpers;
  utils: Utils;
  fecha: typeof fecha;
  numbro: typeof numbro;
};

export default dummyjson;
