export const handleApiCall = async (apiFunction, ...params) => {
    try {
        const response = await apiFunction(...params);
        return { data: response.data, status: response.status, error: null };
    } catch (error) {
        console.error('API Error:', error.response?.data?.detail || error.message);
        return { data: null, error: error.response?.data?.detail || error.message };
    }
};
