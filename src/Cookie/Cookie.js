import Cookie from 'js-cookie';

export const setBrowserCookie = (Token) => {
    try {
        Cookie.set("jwtToken", Token);
        return {sucessMessage: 'Login Sucessfull'};
    } catch (error) {
        console.log(error);
        // return { errorMessage: "Something went wrong"}
        throw error;
    }
}

export const getCookie = async () => {
    try {
        const jwtToken = Cookie.get("jwtToken");
        
        return {
            Token: jwtToken,
        }
    } catch (error) {
        return {Error : error}
    }
}

export const clearCookie = () => {
    Cookie.remove("jwtToken");
}