import { buildApiUrl } from "../utils/apiConfig";

export const loginRequest = async (numeroEmpleado) => {
  const url = await buildApiUrl(`/login/${numeroEmpleado}`);
  const response = await fetch(url);

  if (!response.ok) {
    let message = "Error desconocido";
    try {
      const errorJson = await response.json();
      message = errorJson.message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
};