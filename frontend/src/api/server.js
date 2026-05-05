// const DEFAULT_API_BASE_URL = "https://apanamarket.vercel.app/api";

// const API_BASE_URL = (
//   import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
// ).replace(/\/+$/, "");

// export class ApiError extends Error {
//   constructor(message, { status, data } = {}) {
//     super(message);
//     this.name = "ApiError";
//     this.status = status;
//     this.data = data;
//   }
// }

// const buildUrl = (route) => {
//   if (!route) {
//     throw new ApiError("API route is required");
//   }

//   if (/^https?:\/\//i.test(route)) {
//     return route;
//   }

//   const routeWithoutApiPrefix = route.replace(/^\/?api(?=\/)/i, "");
//   const cleanRoute = routeWithoutApiPrefix.startsWith("/")
//     ? routeWithoutApiPrefix
//     : `/${routeWithoutApiPrefix}`;

//   return `${API_BASE_URL}${cleanRoute}`;
// };

// const parseResponse = async (response) => {
//   const contentType = response.headers.get("content-type") || "";

//   if (response.status === 204) {
//     return null;
//   }

//   if (contentType.includes("application/json")) {
//     return response.json();
//   }

//   return response.text();
// };

// const getErrorMessage = (data) => {
//   if (Array.isArray(data?.error)) {
//     return data.error.join(", ");
//   }

//   return data?.message || data?.error || "Request failed";
// };

// export const fetchData = async (route, options = {}) => {
//   const { headers, body, ...restOptions } = options;
//   const isFormData = body instanceof FormData;
//   const isJsonBody =
//     body && typeof body === "object" && !isFormData && !(body instanceof Blob);

//   const response = await fetch(buildUrl(route), {
//     ...restOptions,
//     headers: {
//       ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
//       ...headers,
//     },
//     body: isJsonBody ? JSON.stringify(body) : body,
//   });

//   const data = await parseResponse(response);

//   if (!response.ok) {
//     throw new ApiError(getErrorMessage(data), {
//       status: response.status,
//       data,
//     });
//   }

//   return data;
// };

// export default fetchData;

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://college-marketplace-26dv.onrender.com/api"
).replace(/\/+$/, "");

export const AUTH_TOKEN_KEY = "collegeMarketplaceAuthToken";

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

const parseResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const getErrorMessage = (data) => {
  if (Array.isArray(data?.error)) {
    return data.error.join(", ");
  }

  return data?.message || data?.error || "Request failed";
};

export const fetchData = async (route, options = {}) => {
  const url = `${API_BASE_URL}${route.startsWith("/") ? route : `/${route}`}`;
  const { headers, body, ...restOptions } = options;
  const isFormData = body instanceof FormData;
  const token = getAuthToken();

  const response = await fetch(url, {
    ...restOptions,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data), {
      status: response.status,
      data,
    });
  }

  return data;
};

export default fetchData;
