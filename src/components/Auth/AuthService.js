// authService.js

// Function to log the user out by removing the JWT token from local storage
export const logout = () => {
  localStorage.removeItem("jwtToken");
};

// Function to check if the user is authenticated by verifying the presence of the JWT token
export const checkAuthentication = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  return !!jwtToken; // Returns true if the token exists, indicating the user is authenticated
};

// Function to decode the JWT token and retrieve the userId claim
export const getUserId = () => {
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    // Handle the case where the token doesn't exist (user is not authenticated)
    return null;
  }

  try {
    // Decode the JWT token manually (assuming it's in the format "header.payload.signature")
    const base64Url = jwtToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decodedToken = JSON.parse(jsonPayload);

    if (decodedToken.userId) {
      return decodedToken.userId; // Return the userId claim
    } else {
      // Handle the case where the userId claim is missing in the token
      return null;
    }
  } catch (error) {
    // Handle any decoding errors
    console.error("Error decoding JWT token:", error);
    return null;
  }
};
