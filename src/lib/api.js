import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const loginUser = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
}

export const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
}

export const getAllFriends = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const response = await api.get("/chat/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const addFriends = async (other_user_id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const response = await api.post("/chat/room", 
    {other_user_id},
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const getMyChatRooms = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const response = await api.get("/chat/getrooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const getMessages = async (roomId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const roomIdInt = parseInt(roomId, 10);
  const response = await api.get(`/chat/room/${roomIdInt}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// ส่งข้อความใน room
export const sendMessage = async (roomId, content) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login.");

  const roomIdInt = parseInt(roomId, 10);
  const response = await api.post(
    `/chat/room/${roomIdInt}/message`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // {id, sender_id, content, created_at}
};