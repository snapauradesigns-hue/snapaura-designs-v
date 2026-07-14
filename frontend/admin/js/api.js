const API = window.API;

function getToken() {
  return localStorage.getItem("token");
}

async function request(endpoint, options = {}) {
  const headers = {
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (getToken()) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }

  const response = await fetch(API + endpoint, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request Failed");
  }

  return data;
}

const api = {
  get(url) {
    return request(url);
  },

  post(url, body) {
    return request(url, {
      method: "POST",
      body,
    });
  },

  put(url, body) {
    return request(url, {
      method: "PUT",
      body,
    });
  },

  delete(url) {
    return request(url, {
      method: "DELETE",
    });
  },
};
