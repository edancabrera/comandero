import { buildApiUrl } from "../utils/apiConfig";

export const loginRequest = async (numeroEmpleado) => {
  try {
    const url = await buildApiUrl(`/login/${numeroEmpleado}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);


    const response = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      let message = "Error del servidor";
      try {
        const errorJson = await response.json();
        message = errorJson.message;
      } catch {}
      throw {
        type: "SERVER_ERROR",
        message
      }
    }

    return response.json();

  } catch (error) {
    if(error.name === "AbortError") {
      throw {
        type: "TIMEOUT",
        message: "El servidor no responde, verifique ip del servidor"
      };
    }
    if (error.message === "Network request failed") {
      throw {
        type: "NETWORK_ERROR",
        message: "No hay conexión con el servidor, verifique ip del servidor"
      };
    }

    throw {
      type: "UNKNOWN",
      message: error.message || "Error desconocido"
    }
  }
};