import React from 'react';

import ArrowElbowUpLeft from '../assets/ArrowElbowUpLeft.svg';
import ArrowElbowUpRight from '../assets/ArrowElbowUpRight.svg';
import ArrowUp from '../assets/ArrowUp.svg';
import ArrowUpLeft from '../assets/ArrowUpLeft.svg';
import ArrowUpRight from '../assets/ArrowUpRight.svg';
import Back from '../assets/back.svg';
import Bank from '../assets/bank.svg';
import Bar from '../assets/bar.svg';
import Bookmark from '../assets/bookmark.svg';
import BookmarkFavorite from '../assets/bookmark-favorite.svg';
import Cafe from '../assets/cafeteria.svg';
import Camera from '../assets/camera.svg';
import Car from '../assets/Car.svg';
import Carpentry from '../assets/carpentry.svg';
import Church from '../assets/church.svg';
import Circus from '../assets/circus.svg';
import Close from '../assets/close.svg';
import Clothes from '../assets/clothes.svg';
import Cocktail from '../assets/cocktail.svg';
import Cookie from '../assets/cookie.svg';
import Crosshair from '../assets/crosshair.svg';
import Down from '../assets/down.svg';
import Edit from '../assets/edit.svg';
import Envelope from '../assets/envelope.svg';
import Eye from '../assets/eye.svg';
import EyeClosed from '../assets/eye-closed.svg';
import Factory from '../assets/factory.svg';
import FancyClothes from '../assets/fancy-clothes.svg';
import Favorite from '../assets/heart-focused.svg';
import FemaleClothes from '../assets/female-clothes.svg';
import Finish from '../assets/finish.svg';
import FirstAid from '../assets/first-aid.svg';
import Gaming from '../assets/gaming.svg';
import Garden from '../assets/garden.svg';
import Gas from '../assets/gas-black.svg';
import Gift from '../assets/gift.svg';
import Handbag from '../assets/handbag.svg';
import Heart from '../assets/heart.svg';
import HeartFavorite from '../assets/heart-favorite.svg';
import HeartFocused from '../assets/heart-focused.svg';
import History from '../assets/history.svg';
import House from '../assets/house.svg';
import HouseFocused from '../assets/house-focused.svg';
import IceCream from '../assets/icecream.svg';
import Instagram from '../assets/instagram-plain.svg';
import Ironmongery from '../assets/ironmongery.svg';
import JunkFood from '../assets/junk-food.svg';
import Left from '../assets/left.svg';
import Library from '../assets/library.svg';
import Loan from '../assets/loan.svg';
import Location from '../assets/location.svg';
import Lock from '../assets/lock.svg';
import Logistics from '../assets/logistics.svg';
import Mall from '../assets/mall.svg';
import Map from '../assets/map.svg';
import Market from '../assets/market.svg';
import Mask from '../assets/mask.svg';
import Movies from '../assets/movies.svg';
import MusicStore from '../assets/music-store.svg';
import NumberOne from '../assets/NumberOne.svg';
import NumberTwo from '../assets/NumberTwo.svg';
import NumberThree from '../assets/NumberThree.svg';
import NumberFour from '../assets/NumberFour.svg';
import NumberFive from '../assets/NumberFive.svg';
import Odontology from '../assets/odontology.svg';
import OfficeChair from '../assets/office-chair.svg';
import Other from '../assets/others.svg';
import PetStore from '../assets/animal.svg';
import Pharmacy from '../assets/pharmacy-black.svg';
import PhoneOutgoing from '../assets/phone-outgoing.svg';
import PhotoStore from '../assets/photo-store.svg';
import Pizza from '../assets/pizza.svg';
import Restaurant from '../assets/forkknife.svg';
import School from '../assets/school.svg';
import Search from '../assets/search.svg';
import Sewing from '../assets/sewing.svg';
import Shoe from '../assets/shoe.svg';
import Sports from '../assets/sports.svg';
import Star from '../assets/star.svg';
import StarOut from '../assets/star-out.svg';
import Tech from '../assets/tech.svg';
import Timer from '../assets/timer.svg';
import User from '../assets/user.svg';
import UserCircle from '../assets/user-circle.svg';
import UserCircleFocused from '../assets/user-circle-focused.svg';
import UserCirclePlain from '../assets/user-circle-plain.svg';
import Vegetarian from '../assets/vegetarian.svg';
import Vet from '../assets/vet.svg';
import Warning from '../assets/warning.svg';
import WatchStore from '../assets/watch-store.svg';
import Whatsapp from '../assets/whatsapp.svg';


export const useIcons = (name: string, height: number, width: number) => {
    switch (name) {
        case 'ArrowElbowUpLeft':
            return <ArrowElbowUpLeft height={height} width={width} />;
        case 'ArrowElbowUpRight':
            return <ArrowElbowUpRight height={height} width={width} />;
        case 'ArrowUp':
            return <ArrowUp height={height} width={width} />;
        case 'ArrowUpLeft':
            return <ArrowUpLeft height={height} width={width} />;
        case 'ArrowUpRight':
            return <ArrowUpRight height={height} width={width} />;
        case 'Back':
            return <Back height={height} width={width} />;
        case 'Banco':
            return <Bank height={height} width={width} />;
        case 'Bar':
            return <Bar height={height} width={width} />;
        case 'Bookmark':
            return <Bookmark height={height} width={width} />;
        case 'BookmarkFavorite':
            return <BookmarkFavorite height={height} width={width} />;
        case 'Cafetería':
            return <Cafe height={height} width={width} />;
        case 'Camera':
            return <Camera height={height} width={width} />;
        case 'Car':
            return <Car height={height} width={width} />;
        case 'Carpintería':
            return <Carpentry height={height} width={width} />;
        case 'Centro comercial':
            return <Mall height={height} width={width} />;
        case 'Close':
            return <Close height={height} width={width} />;
        case 'Cocteles':
            return <Cocktail height={height} width={width} />;
        case 'Comida Rápida':
            return <JunkFood height={height} width={width} />;
        case 'Comida vegetariana':
            return <Vegetarian height={height} width={width} />;
        case 'Crosshair':
            return <Crosshair height={height} width={width} />;
        case 'Deportes':
            return <Sports height={height} width={width} />;
        case 'Down':
            return <Down height={height} width={width} />;
        case 'Dulcería':
            return <Cookie height={height} width={width} />;
        case 'Edit':
            return <Edit height={height} width={width} />;
        case 'Enfermería':
            return <FirstAid height={height} width={width} />;
        case 'Envelope':
            return <Envelope height={height} width={width} />;
        case 'Escuela':
            return <School height={height} width={width} />;
        case 'Eye':
            return <Eye height={height} width={width} />;
        case 'EyeClosed':
            return <EyeClosed height={height} width={width} />;
        case 'Fábrica':
            return <Factory height={height} width={width} />;
        case 'Farmacia':
            return <Pharmacy height={height} width={width} />;
        case 'Favorite':
            return <Favorite height={height} width={width} />;
        case 'Ferretería':
            return <Ironmongery height={height} width={width} />;
        case 'Financiamiento':
            return <Loan height={height} width={width} />;
        case 'Finish':
            return <Finish height={height} width={width} />;
        case 'Fotografía':
            return <PhotoStore height={height} width={width} />;
        case 'Gasolinera':
            return <Gas height={height} width={width} />;
        case 'Heart':
            return <Heart height={height} width={width} />;
        case 'HeartFavorite':
            return <HeartFavorite height={height} width={width} />;
        case 'HeartFocused':
            return <HeartFocused height={height} width={width} />;
        case 'Heladería':
            return <IceCream height={height} width={width} />;
        case 'History':
            return <History height={height} width={width} />;
        case 'House':
            return <House height={height} width={width} />;
        case 'HouseFocused':
            return <HouseFocused height={height} width={width} />;
        case 'Iglesia':
            return <Church height={height} width={width} />;
        case 'Instagram':
            return <Instagram height={height} width={width} />;
        case 'Jardinería':
            return <Garden height={height} width={width} />;
        case 'Joyería':
            return <WatchStore height={height} width={width} />;
        case 'Left':
            return <Left height={height} width={width} />;
        case 'Librería':
            return <Library height={height} width={width} />;
        case 'Location':
            return <Location height={height} width={width} />;
        case 'Lock':
            return <Lock height={height} width={width} />;
        case 'Logística':
            return <Logistics height={height} width={width} />;
        case 'Map':
            return <Map height={height} width={width} />;
        case 'Marroquinería':
            return <Handbag height={height} width={width} />;
        case 'Mascotas':
            return <PetStore height={height} width={width} />;
        case 'Mask':
            return <Mask height={height} width={width} />;
        case 'Mercado':
            return <Market height={height} width={width} />;
        case 'Música':
            return <MusicStore height={height} width={width} />;
        case 'NumberOne':
            return <NumberOne height={height} width={width} />;
        case 'NumberTwo':
            return <NumberTwo height={height} width={width} />;
        case 'NumberThree':
            return <NumberThree height={height} width={width} />;
        case 'NumberFour':
            return <NumberFour height={height} width={width} />;
        case 'NumberFive':
            return <NumberFive height={height} width={width} />;
        case 'Odontología':
            return <Odontology height={height} width={width} />;
        case 'Oficina':
            return <OfficeChair height={height} width={width} />;
        case 'Parque de diversiones':
            return <Circus height={height} width={width} />;
        case 'Películas':
            return <Movies height={height} width={width} />;
        case 'PhoneOutgoing':
            return <PhoneOutgoing height={height} width={width} />;
        case 'Piñatería':
            return <Gift height={height} width={width} />;
        case 'Pizzería':
            return <Pizza height={height} width={width} />;
        case 'Restaurante':
            return <Restaurant height={height} width={width} />;
        case 'Ropa de alquiler':
            return <FancyClothes height={height} width={width} />;
        case 'Ropa':
            return <Clothes height={height} width={width} />;
        case 'Ropa femenina':
            return <FemaleClothes height={height} width={width} />;
        case 'Sastrería':
            return <Sewing height={height} width={width} />;
        case 'Search':
            return <Search height={height} width={width} />;
        case 'Star':
            return <Star height={height} width={width} />;
        case 'StarOut':
            return <StarOut height={height} width={width} />;
        case 'Tecnología':
            return <Tech height={height} width={width} />;
        case 'Timer':
            return <Timer height={height} width={width} />;
        case 'User':
            return <User height={height} width={width} />;
        case 'UserCircle':
            return <UserCircle height={height} width={width} />;
        case 'UserCircleFocused':
            return <UserCircleFocused height={height} width={width} />;
        case 'UserCirclePlain':
            return <UserCirclePlain height={height} width={width} />;
        case 'Veterinaria':
            return <Vet height={height} width={width} />;
        case 'Videojuegos':
            return <Gaming height={height} width={width} />;
        case 'Warning':
            return <Warning height={height} width={width} />;
        case 'Whatsapp':
            return <Whatsapp height={height} width={width} />;
        case 'Zapatería':
            return <Shoe height={height} width={width} />;
        case 'Otro':
            return <Other height={height} width={width} />;
    }
};