
export interface IUser {
    _id?:      string;
    role:      roles | string;
    name:      string;
    email:     string;
    username?: string;
    password:  string;
    status:    boolean;
    photo?:    string;
}

export interface LoginInterface {
    user:  IUser;
    token: string;
}

export enum roles {
    ADMIN  = 'admin',
    CLIENT = 'client',
    PLACE  = 'place'
}

export interface LoginData {
    email:    string;
    password: string;
}

export interface IRatingList {
    total: number;
    rates: IRate[];
}

export interface IRate {
    _id?:      string;
    rate:      number;
    comments:  string;
    place:     IPlace;
    user?:     IUser;
    createdAt: string;
}

export interface IRating {
    rate:      number;
    comments:  string;
    place:     string;
    user:      string;
}

export interface IRatingAverage {
    average: number;
}

export interface ISearch {
    keyword:       string;
    totalPlaces:   TotalPlace[];
    places:        IPlace[];
    totalProducts: TotalProduct[];
    products:      IProduct[];
}

export interface IPlace {
    _id:         string;
    name:        string;
    description: string;
    category:    string[];
    address:     string;
    coords:      Location;
    phone:       number;
    whatsapp?:   string;
    instagram?:  string;
    city:        string;
    state:       string;
    country:     string;
    schedule:    string[];
    photo:       string;
    pics?:       string[];
    rate:        NumericRate;
    status:      boolean;
}

export interface IProduct {
    _id:         string;
    name:        string;
    description: string;
    category:    string[];
    observation: string;
    price:       number;
    place:       IPlace[];
    rate:        NumericRate;
    img?:        string;
    status:      boolean;
}

export interface TotalPlace {
    totalPlaces: number;
}

export interface TotalProduct {
    totalProducts: number;
}

export interface NumericRate {
    $numberDecimal: string;
}

export interface IFavorites {
    total:     number;
    favorites: IFavorite[];
}

export interface IFavorite {
    place:     IPlace;
    createdAt: string;
}

export interface IHistory {
    total:     number;
    services:  IService[];
}

export interface IService {
    date:      string;
    place:     IPlace;
    search:    string;
    user:      string;
}

export interface Location {
    latitude:  number;
    longitude: number;
}

export interface FavoriteItem {
    place:     string;
    user:      string;
}

export interface Direction {
    distance:          Distance;
    duration:          Distance;
    end_location:      Location;
    html_instructions: string;
    maneuver:          string | undefined;
}

export interface Distance {
    text:  string;
    value: number;
}

export interface Step {
    distance: string;
    html_instructions: string;
    maneuver: string | undefined;
    end_location: Location;
}
