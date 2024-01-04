import { useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext, PlacesContext } from '../context';
import { IPlace } from '../interfaces';

interface Props {
    place: IPlace;
}

export const useFavoritesAndService = ({ place: favorite }: Props) => {
    const { user } = useContext(AuthContext);
    const { addFavorite, addService, deleteFavorite, deleteService, getFavorite, getHistorical, getHistoryItem } = useContext(PlacesContext);

    const removeFavorite = async () => {
        Alert.alert('Eliminar de favoritos', '¿Quieres eliminar este lugar de tu lista de favoritos?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Eliminar',
                onPress: async () => await deleteFavorite(user?._id!, favorite._id)
            }
        ]);
    };

    return {
        addFavorite,
        addService,
        deleteFavorite,
        deleteService,
        getFavorite,
        getHistorical,
        getHistoryItem,
        removeFavorite
    };
};
