export const API_URL = "http://192.168.0.20:8080"

interface NationalityToFlag {
    [key: string]: string;
};

export const nationalityToFlag : NationalityToFlag = {
    Spanish : "es",
    British : "gb",
    French : "fr",
    Italian : "it",
    German : "de",
    Dutch : "nl",
    Finnish : "fi",
    Brazilian : "br",
    Austrian : "at",
    Argentine : "ar",
    Australian : "au",
    "South African" : "za",
    "New Zealander" : "nz",
    Venezuelan : "ve",
    American : "us",
    Swiss : "ch",
    Swedish : "se",
    Thai : "th",
    Japanese : "jp",
    Polish : "pl",
    Belgian : "be",
    Mexican : "mx",
    Canadian : "ca",
    Monegasque : "mc",
    Colombian : "co",
    Chilean : "cl",
    Hungarian : "hu",
    Irish : "ie",
    Danish : "dk",
    Czech : "cz",
    Malaysian : "my",
    Portuguese : "pt",
    Liechtensteiner : "li",
    Rhodesian : "zw",
    Uruguayan : "uy",
    Indian : "in",
    "East German" : "de",
    Indonesian : "id",
    Russian : "ru",
    Chinese : "cn"
}

export const countryToFlag : NationalityToFlag = {
    Spain : "es",
    UK : "gb",
    France : "fr",
    Italy : "it",
    Germany : "de",
    Netherlands : "nl",
    Finland : "fi",
    Brazil : "br",
    Austria : "at",
    Argentina: "ar",
    Australia : "au",
    "South Africa" : "za",
    "New Zealand" : "nz",
    Venezuela : "ve",
    USA : "us",
    "United States" : "us",
    Switzerland : "ch",
    Sweden : "se",
    Thailand : "th",
    Japan : "jp",
    Polish : "pl",
    Belgium : "be",
    Mexico: "mx",
    Canada : "ca",
    Monaco : "mc",
    Colombia : "co",
    Chili : "cl",
    Hungary : "hu",
    Ireland : "ie",
    Denmark : "dk",
    Czech : "cz",
    Malaysia : "my",
    Portugal : "pt",
    Uruguay : "uy",
    India : "in",
    Indonesia : "id",
    Russia : "ru",
    China : "cn",
    "Saudi Arabia" : "sa",
    Turkey : "tr",
    Bahrain : "bh",
    Azerbaijan : "az",
    Singapore : "sg",
    Qatar : "qa",
    UAE : "ae",
    Korea : "kr",
    Morocco : "ma"
}

/** 
 * Do a comparison between a and b, in function of op
 */
export function compare(a: any, b: any, op: string): boolean {
    if (op === ">=")  return a >= b;
    else if (op === "=") return a === b;
    return a <= b;
  }
  
/**
 * Sort a and b in function of their type and the order
 */
export function sort(a: any, b: any, type: string, order: string): number {
    if (order === "asc") {
        if (type === "surname" || type === "name") {
            return a > b ? 1 : a < b ? -1 : 0;
        }
        else if (type === "dob") {
            return a > b ? -1 : a < b ? 1 : 0;
        }
        return a - b;
    }
    if (type === "surname" || type === "name") {
        return a > b ? -1 : a < b ? 1 : 0;
    }
    else if (type === "dob") {
        return a > b ? 1 : a < b ? -1 : 0;
    }
    return b - a;
}

export function handleClickOutside(ref : React.RefObject<HTMLElement>, setVisiblilty : React.Dispatch<React.SetStateAction<boolean>>) {
    const handleClickOutside = (e : MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setVisiblilty(false);
          }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
}

//TYPES

export interface Driver {
    id : number,
    driverRef : string,
    number : number,
    code : number,
    forename : string,
    surname : string,
    dob : Date,
    nationality : string,
    url : string,
    titles : number,
    grandprix : number,
    wins : number,
    podiums : number,
    poles : number,
    highestGridPosition : number,
    highestRacePosition : number
}

export interface Team {
    id : number,
    constructorRef : string,
    name : string,
    nationality : string,
    url : string,
    titles : number,
    races : number,
    wins : number,
}