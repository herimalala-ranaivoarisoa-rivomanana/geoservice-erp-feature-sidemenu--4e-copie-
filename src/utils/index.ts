import axios from 'axios';

export const getHeaders = (authToken?: any) => {
    const headers : any = {
        'Content-Type': 'application/json'
    }
    if(authToken){
        headers.Authorization = `Bearer ${authToken}`;
    }
    return headers
}

export const makeRequest = (url: string, method:string, body?:any, headers?:any ) => {
    const options: any = {
        method,
        url
    }
    if(body){
        options.data = body;
    }
    if(headers){
        options.headers = headers;
    }
    return axios(options);
}

/**Read from LS */
export const getFromLS = (key: string) => {
    try{
        if(typeof window !== 'undefined'){
            const item = localStorage.getItem(key);
            return item;
        }
        else {
            return null
        }
    }
    catch(err){
        return null;
    }
}

/**Write to LS */

export const writeToLS = (key: string, data: string) => {
    try{
        if(typeof window !== 'undefined'){
            localStorage.setItem(key, data);
            return true;
        }
        else return false;
    }
    catch(err){
        return false;
    }
}

/**Remove from LS */

export const removeFromLS = (key: string) => {
    try{
        if(typeof window !== 'undefined'){
            localStorage.removeItem(key);
            return true;
        }
        else return false;
    }
    catch(err){
        return false;
    }
}

export interface IServiceError {
    error: string | any;
}