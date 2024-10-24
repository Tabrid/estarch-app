import axios from 'axios';
import baseUrl from '../../components/services/baseUrl';

const instance = axios.create({
  baseURL: `${baseUrl}/api`, // Set the base URL for your backend
});

export default instance;
