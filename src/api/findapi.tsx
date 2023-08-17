import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const findAPI = axios.create({ baseURL: 'https://findapp-api-com.onrender.com/api' });

findAPI.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');

        if (token && user) {
            config.headers = { 'x-token': token, 'xuser': user };
        }

        return config;
    }
);

export default findAPI;