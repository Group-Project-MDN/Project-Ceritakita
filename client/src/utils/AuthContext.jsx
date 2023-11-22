import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import {useNavigate} from "react-router-dom"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    
    useEffect(() => {
      getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails)
            console.log('accountDetails:', accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        // console.log('CREDS:', credentials )

        try {
            const response = await account.createEmailSession(credentials.email, credentials.password);
            console.log("LOGGEDIN:", response);
            let accountDetails = await account.get();
            setUser(accountDetails)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    const handleUserLogOut = async () => {
        await account.deleteSession('current')
        setUser(null)
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogOut,
    }
    
    return <AuthContext.Provider value={contextData}>
        {loading  ? <p>Loading...</p> : children}
           </AuthContext.Provider>
    
};

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext;
