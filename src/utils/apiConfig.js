import AsyncStorage from "@react-native-async-storage/async-storage";

const IP_KEY = "SERVER_IP";

export const saveServerIp = async (ip) => {
  await AsyncStorage.setItem(IP_KEY, ip);
};

export const getServerIp = async () => {
  return await AsyncStorage.getItem(IP_KEY);
};

export const clearIp = async () => {
  return await AsyncStorage.removeItem(IP_KEY);
}

export const buildApiUrl = async (endpoint) => {
  const ip = await getServerIp();
  if (!ip) throw new Error("IP no configurada");
  return `http://${ip}:8080${endpoint}`;
};
