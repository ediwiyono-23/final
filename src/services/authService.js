export const loginUser = (email, password) => {
  if (email === "admin@mail.com" && password === "admin123") {
    return {
      token: "admin-token",
      user: { name: "Admin", role: "admin" },
    };
  }

  if (email === "user@mail.com" && password === "user123") {
    return {
      token: "user-token",
      user: { name: "User", role: "user" },
    };
  }

  return null;
};
