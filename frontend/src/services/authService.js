const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const register = async (username,email,password,role) => {
  const response = await fetch(`${API_URL}/auth/signup`,
    {method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username,email,password,roles: [role]})}
  );
  const data = await response.json();
  if (!response.ok) {throw new Error( data.message || "Error al registrar usuario");
  }
  return data;
};

export const login = async ( username,password) => {
  const response = await fetch(`${API_URL}/auth/signin`,
    {method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username,password})}
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  localStorage.setItem("user",JSON.stringify(data));
  return data;
};

export const logout = () => {localStorage.removeItem("user");
};
export const getCurrentUser = () => { const user = localStorage.getItem("user");
  return user ? JSON.parse(user): null;
};
export const getProtectedContent = async (endpoint) => {
  const user = getCurrentUser();
  const response = await fetch(`${API_URL}/test/${endpoint}`,
    {headers: user?.accessToken ? { Authorization: `Bearer ${user.accessToken}`} : {}}
  );

  const data = await response.text();
  if (!response.ok) { throw new Error(data);}
  return data;
};