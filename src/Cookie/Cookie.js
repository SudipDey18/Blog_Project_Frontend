import Cookie from 'js-cookie';

export const setCookie = (Token) => {
    try {
        Cookie.set("jwtToken", Token);
        return {sucessMessage: 'Login Sucessfull'};
    } catch (error) {
        console.log(error);
        return { errorMessage: "Something went wrong"}
    }
}

export const getCookie = async () => {
    try {
        const jwtToken = Cookie.get("jwtToken");
        // console.log(jwtToken,1);
        
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