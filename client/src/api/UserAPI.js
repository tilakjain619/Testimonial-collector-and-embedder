import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const UserAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    setIsLogged(true);
                } catch (error) {
                    toast.warning(error.response.data.msg);
                }
            }
            getUser();
        }
    }, [token])

    return {
        isLogged: [isLogged, setIsLogged]
    }
}

export default UserAPI