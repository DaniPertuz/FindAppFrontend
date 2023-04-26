
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
    rate:      number;
    comments:  string;
    place?:    IPlace;
    user?:     IUser;
    createdAt: string;
}
export interface IRatingAverage {
    average: number;
}

export interface ISearch {
    keyword:       string;
    totalPlaces:   number;
    places:        IPlace[];
    totalProducts: number;
    products:      IProduct[];
}

export interface IPlace {
    _id:         string;
    name:        string;
    description: string;
    category:    Categories[];
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
    rate:        PlaceRate;
    status:      boolean;
}
export interface PlaceRate {
    $numberDecimal: string;
}

export interface IProduct {
    _id:         string;
    name:        string;
    description: string;
    category:    Categories;
    observation: string;
    price:       number;
    place:       IPlace;
    rate:        PlaceRate;
    img?:        string;
    status:      boolean;
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