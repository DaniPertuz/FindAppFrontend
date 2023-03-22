
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
    username: string;
    password: string;
}

export interface IRating {
    rate:        number;
    comments?:   string;
    place:       string;
    user:        string;
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
    icon:        string;
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
    date:   string;
    place: {
        _id:         string;
        name:        string;
        description: string;
        address:     string;
        phone:       number;
        photo:       string;
    };
    search: string;
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