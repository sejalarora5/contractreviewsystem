import { ENDPOINTS } from "./apiConfig";
import axiosInstance, { setJSONHeader, setMultipartHeader } from "./axiosInstance";

class ApiService {
    // User APIs
    static userApi = {
        register: (userData) => {
            setJSONHeader();
            return axiosInstance.post(ENDPOINTS.register, {
                username: userData.username,
                email: userData.email,
                fullname: userData.fullname,
                password: userData.password
            });
        },

        login: (username, password) => {
            setMultipartHeader();
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            return axiosInstance.post(ENDPOINTS.login, formData);
        },

        logout: () => {
            setJSONHeader();
            return axiosInstance.post(ENDPOINTS.logout);
        },

    };

    // Document APIs
    static documentApi = {
        uploadDocuments: (standardFile, revisedFile, onUploadProgress) => {
            setMultipartHeader();
            const formData = new FormData();
            formData.append('standard_file', standardFile);
            formData.append('revised_file', revisedFile);
            
            return axiosInstance.post(ENDPOINTS.uploadDocs, formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    if (onUploadProgress) {
                        onUploadProgress(progress);
                    }
                }
            });
        },

        deleteDocuments: () => {
            return axiosInstance.delete(ENDPOINTS.deleteDocs);
        },

        compareDocuments: () => {
            setJSONHeader();
            return axiosInstance.get(ENDPOINTS.compareDocs);
        },

        explainClause: (clause, documentType) => {
            setMultipartHeader();
            const formData = new FormData();
            formData.append('clause', clause);
            formData.append('document_type', documentType);
            return axiosInstance.post(ENDPOINTS.explainClause, formData);
        },
    };

     // History APIs
     static historyApi = {
        getHistory: (offset = 0, limit = 5) => {
            setJSONHeader();
            return axiosInstance.get('/history/get-history/', {
                params: {
                    offset,
                    limit
                }
            });
        }
    };
}

export default ApiService;