import { axiosPrivate } from "./axios";

/**
 * wrapper to let RTQ Query use Axios instead of fetch
 * @param {Object} options - I can add details if needed
 */

export const axiosBaseQuery = 
  ({ baseUrl } = {}) =>
    // accepts url, method, body (data?), and query string (params) from RTKQ
    async ({ url, method, data, params }) => {
        try {
            const fullUrl = baseUrl
              ? `${baseUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`
              : url.replace(/^\/+/, '');

            // calls axiosPrivate to trigger token/refreshes automatically
            const result = await axiosPrivate({
                url: baseUrl ? baseUrl + url : url,
                method,
                data,
                params,
            });
            // returns the body or an error in correct shape for RTKQ
            return { data: result.data };
        } catch (axiosError) {
            const error = axiosError;
            return {
                error: {
                    status: error.response?.status,
                    data: error.response?.data || error.message,
                },
            };
        }
    };