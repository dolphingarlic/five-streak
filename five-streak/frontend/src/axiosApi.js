import axios from "axios";

const baseURL = "/api/";

const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (
            error.response.status === 401 &&
            originalRequest.url === "/token/refresh/"
        ) {
            window.location.href = "/";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            localStorage.removeItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    try {
                        const response = await axiosInstance.post(
                            "/token/refresh/",
                            { refresh: refreshToken }
                        );
                        localStorage.setItem(
                            "access_token",
                            response.data.access
                        );
                        localStorage.setItem(
                            "refresh_token",
                            response.data.refresh
                        );
                        axiosInstance.defaults.headers["Authorization"] =
                            "JWT " + response.data.access;
                        originalRequest.headers["Authorization"] =
                            "JWT " + response.data.access;
                        return axiosInstance(originalRequest);
                    } catch (error) {
                        throw error;
                    }
                } else {
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/";
                }
            } else {
                window.location.href = "/";
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;
