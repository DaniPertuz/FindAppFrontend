
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
    _id:      string;
    rate:     number;
    comments: string;
    place:    IPlace;
    user:     string;
}
export interface IRating {
    rate:        number;
    comments?:   string;
    user:        IUser | null;
    createdAt:   string;
}

export interface IRatings {
    total: number;
    rates: IRating[];
}
export interface IRatingAverage {
    average: number;
}

export interface IPlace {
    _id:         string;
    name:        string;
    description: string;
    category:    Categories[];
    address:     string;
    phone:       number;
    city:        string;
    state:       string;
    country:     string;
    schedule:    string[];
    photo:       string;
    pics?:       string[];
    rate:        number;
    status:      boolean;
}

export interface IProduct {
    _id:         string;
    name:        string;
    description: string;
    category:    Categories;
    observation: string;
    price:       number;
    restaurant:  IPlace;
    rate:        number;
    img?:        string;
    status:      boolean;
}

export interface ISearch {
    date:        string;
    keyword:     string;
    totalPlaces: number;
    places:      IPlace[];
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
    createdAt: string;
}

export interface Location {
    latitude:  number;
    longitude: number;
}

export enum Categories {
    BAKERY             = 'bakery',
    BEAUTY_SALOON      = 'beauty saloon',
    CHURCH             = 'church',
    CLOTHING           = 'clothing',
    DRIVING_SCHOOL     = 'driving school',
    ELECTRONIC_DEVICES = 'electronic devices',
    GROCERY_STORE      = 'store',
    GYM                = 'gym',
    HOSPITAL           = 'hospital',
    HOTEL              = 'hotel',
    IRONMONGERY        = 'ironmongery',
    JEWELRY            = 'jewelry',
    MALL               = 'mall',
    MISCELLANY         = 'miscellany',
    MOTEL              = 'motel',
    PARK               = 'park',
    PHARMACY           = 'pharmacy',
    RESTAURANT         = 'restaurant',
    SCHOOL             = 'school',
    SPORTS_STORE       = 'sports_store',
    SUPERMARKET        = 'supermarket',
    TECH_STORE         = 'tech store',
    VEHICLE_STORE      = 'vehicle store',
}