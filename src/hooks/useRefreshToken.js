import axios from '../api/axios';
import useAuth from './useAuth';

const refreshTokenUrl = 'RefreshToken'

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get(refreshTokenUrl, {
            withCredentials: true
        });

        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;