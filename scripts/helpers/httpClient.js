const customClient = () => {

    const get = async (endpoint, options) => {
        const response = await fetch(endpoint, options);
        return await response.json();
    }

    return {
        get
    }
}

export default customClient();