const users = [
  {
    id: 1,
    email: "admin@gmail",
    password: "admin",
    name: "Admin Biji",
    role: "admin", 
  },
  {
    id: 2,
    email: "user@gmail",
    password: "user",
    name: "User Pelanggan",
    role: "user", 
  }
];

export const loginUser = (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
  return null; 
};
