export const isFakeUser = (username, fakeUsers) => {
  for (const user of fakeUsers) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
};
export const getFakeUsers = async () => {
  try {
    const response = await fetch(
      "https://dummyjson.com/users?limit=0&select=firstName,lastName,username,password"
    );
    const data = await response.json();
    return data; // Return the data
  } catch (error) {
    console.error(error);
    return null; // Return null or handle the error in an appropriate way
  }
};

export const checkPassword = (username, password, users) => {
  for (const user of users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
};

export const getUserInfo = (username, users) => {
  for (let user of users) {
    if (user.username === username) {
      return user;
    }
  }
  return null;
};
