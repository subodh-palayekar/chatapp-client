
const errorHandling=(error,navigate)=>{

    console.log(error);
    const statusCode = error.response?.status || error.request?.status || 400;

    
    switch (statusCode) {
        case 400:
            {
                console.log("Bad Request: The server cannot understand the request due to a client error..");
                navigate('/app/welcome');
            }
            break;
        case 401:
            {
                console.log("Please login first  Unauthorized: The client must authenticate itself to get the requested response.");
                navigate('/');
            }
            break;
        case 403:
            {
                console.log("Please login first  Forbidden: The client does not have access rights to the content.");
                navigate('/');
            }
            break;
        case 404:
            {
                console.log("Not Found: The requested resource could not be found on the server.");
                navigate('/app/welcome');
            }
            break;
        case 500:
            {
                console.log("Internal Server Error: A generic error message, given when an unexpected condition was encountered.");
                navigate('/app/welcome');
            }
            break;
        case 502:
            {
                console.log("Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from an inbound server.");
                navigate('/app/welcome');
            }
            break;
        case 503:
            {
                console.log("Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from an inbound server.");
                navigate('/app/welcome');
            }
            break;
        default:
            {
                console.log("Unknown Error: An unknown error occurred.");
                navigate('/app/welcome');
            }
    }
}

export default errorHandling;