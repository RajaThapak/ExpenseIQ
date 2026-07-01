import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/user",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // Don't refresh these endpoints
        const skipRefresh = [
            "/auth/login/",
            "/auth/register/",
            "/auth/refresh/",
            "/auth/profile/",
        ];

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !skipRefresh.some(url =>
                originalRequest.url.includes(url)
            )
        ) {

            originalRequest._retry = true;

            try {

                await api.post("/auth/refresh/");

                return api(originalRequest);

            } catch {

                return Promise.reject(error);

            }
        }

        return Promise.reject(error);

    }
);

export default api;