// This api should be the one used for production
//export const BASE_API = "http://"+window.location.host+"/v1/";
// Using this BASE_API for development environment
export const BASE_API = "http://localhost:4001/v1/";
export const API_PATHS = {
    functionsPath: (name) => {
        let path="";
        if(name){
            path="admin/"+name;
        }
        else{
            path="admin";
        }
        return BASE_API+path;
    },
    solver: () => BASE_API
};
