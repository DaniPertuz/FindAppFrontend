import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const findAPI = axios.create({ baseURL: 'http://192.168.20.38:3000/api' });

findAPI.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers = { 'x-token': token };
        }

        return config;
    }
);

export default findAPI;