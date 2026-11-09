export const setCookie = (name, value, options = {}) => {
  const defaultOptions = {
    path: "/",
    maxAge: 86400 * 30,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
  };

  const cookieOptions = { ...defaultOptions, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const optionKey in cookieOptions) {
    const optionValue = cookieOptions[optionKey];
    if (optionValue === false || optionValue === undefined) continue;

    if (optionKey === "maxAge") {
      cookieString += `; max-age=${optionValue}`;
    } else if (optionKey === "expires") {
      cookieString += `; expires=${optionValue.toUTCString()}`;
    } else if (["secure", "httpOnly", "partitioned"].includes(optionKey.toLowerCase())) {
      cookieString += `; ${optionKey}`;
    } else {
      cookieString += `; ${optionKey}=${optionValue}`;
    }
  }

  document.cookie = cookieString;
};

// Get a cookie value by name
export const getCookie = (name) => {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }

    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
};

export const removeCookie = (name, options = {}) => {
  setCookie(name, "", {
    ...options,
    maxAge: -1,
  });
};

// Check if a cookie exists
export const hasCookie = (name) => {
  const value = getCookie(name);
  return value !== null && value !== "";
};

// Parse the JWT token (without validation)
export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT Parse Error:", error);
    return null;
  }
};

export const setAuthTokens = (access_token, refresh_token, role) => {
  const accessTokenMaxAge = 30 * 24 * 60 * 60; 

  const refreshTokenMaxAge = 365 * 24 * 60 * 60; 

  const authMaxAge = 365 * 24 * 60 * 60;

  setCookie("access_token", access_token, {
    maxAge: accessTokenMaxAge,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
    path: "/",
  });

  setCookie("refresh_token", refresh_token, {
    maxAge: refreshTokenMaxAge,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
    path: "/",
  });

  setCookie("role", role, {
    maxAge: authMaxAge,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
    path: "/",
  });

  setCookie("isAuthenticated", "true", {
    maxAge: authMaxAge,
    secure: import.meta.env.VITE_NODE_ENV === "production",
    SameSite: "strict",
    path: "/",
  });
};

// Remove auth tokens
export const removeAuthTokens = () => {
  removeCookie("access_token", { path: "/", secure: import.meta.env.VITE_NODE_ENV === "production", SameSite: "strict" });
  removeCookie("refresh_token", { path: "/", secure: import.meta.env.VITE_NODE_ENV === "production", SameSite: "strict" });
  removeCookie("role", { path: "/", secure: import.meta.env.VITE_NODE_ENV === "production", SameSite: "strict" });
  removeCookie("isAuthenticated", { path: "/", secure: import.meta.env.VITE_NODE_ENV === "production", SameSite: "strict" });
};

// Remove all cookies available to the current path/domain
export const removeAllCookies = () => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    // expire cookie
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    // also try with domain variations
    try {
      const domain = window.location.hostname;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
    } catch (e) {
      // ignore
    }
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload) return true;
  return payload.exp * 1000 < Date.now();
};