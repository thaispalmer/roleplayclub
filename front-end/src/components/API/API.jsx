import axios from 'axios';
import { apiBaseUrl } from '../../variables/Variables';
import { AuthProvider } from '../../components/Auth/AuthProvider';

const API = () => {
  const auth = new AuthProvider();
  const accessToken = auth.getAccessToken();

  const axiosConf = {
    baseURL: apiBaseUrl,
  };

  if (accessToken) {
    axiosConf.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return axios.create(axiosConf);
};

export default API;
