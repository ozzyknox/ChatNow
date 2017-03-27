// sendMessage
export const apiSendMessage = (message) => { 
    return apiRequest('POST', '/messages', message);
}

// fetchResponses
export const apiFetchResponses = () => {
    return apiRequest('GET', '/messages');
}

const apiRequest = (method, path, payload = {}) => {
    const apiPath = 'http://192.168.100.25:8080' + path;

    let request = {
        method,
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    };

    if (method !== 'GET') {
        request = {
            ...request,
            body: JSON.stringify(payload),
        };
    }

    return fetch(apiPath, request);
};