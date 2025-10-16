"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {getAllFriends, getMyChatRooms,addFriends} from "@/lib/api";
import Swal from "sweetalert2";
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";

export default function HomePage() {
  const [users, setUser] = useState([]);
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const data = await getAllFriends();
      setUser(data);
    }catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const fetchRooms= async () => {
    try {
      const data = await getMyChatRooms();
      setRooms(data);
    }catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleChat= async (user) => {
    try {
      const room = rooms.find(r => r.friend.id === user.id);
      if(!room){
         await addFriends(user.id);
      await Swal.fire({
        title: 'Added Friend !',
        text: `You have added ${user.first_name} ${user.last_name} as a friend.`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3b82f6',
      });
      return;

      }
      router.push(`/chat/${room.id} `);
    }catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleAddFriend = async (user) =>{
    try {
      await addFriends(user.id);
      await Swal.fire({
        title: 'Added Friend !',
        text: `You have added ${user.first_name} ${user.last_name} as a friend.`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3b82f6',
      })
      fetchUsers();
      fetchRooms();
    }catch (error) {
      await Swal.fire({
        title: 'Failed to Add Friend',
        text: `Could not add ${user.first_name} ${user.last_name} as a friend. Please try again.`,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3b82f6',
      })
      console.error("Error adding friends:", error);
    }
  }

  const [friends, setFriends] = useState([]);
  const [chat, setchat] = useState([]);
  useEffect(() => {
    fetchUsers();
    fetchRooms();

    setFriends([
      { id: 1, first_name: "Alice", last_name: "Johnson" },
      { id: 2, first_name: "Bob", last_name: "Smith" },
      { id: 3, first_name: "Charlie", last_name: "Brown" },
    ]);
    setchat([
      { id: 1, first_name: "asd", last_name: "Johnson" },
      { id: 2, first_name: "Boasddb", last_name: "Smith" },
      { id: 3, first_name: "sdsd", last_name: "Brown" },
    ]);


  }, []);
  const friendslist = users.filter((u) => u.is_friend);
  const notfriendslist = users.filter((u) => !u.is_friend);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 gap-2">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          👥 My Friends
        </h1>

        {notfriendslist.length > 0 ? (
          <ul className="space-y-3">
            {notfriendslist.map((friend) => (
              <li
                key={friend.id}
                className="flex items-center justify-between bg-blue-100 rounded-xl p-3 shadow-sm hover:shadow-md transition"
              >
                <span className="text-blue-800 font-medium">
                  {friend.first_name} {friend.last_name}
                </span>
                <button 
                onClick={() => handleAddFriend(friend)}
                className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                  Add
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No friends yet.</p>
        )}

        
      </div>

       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          👥 My Chat
        </h1>

        {friendslist.length > 0 ? (
          <ul className="space-y-3">
            {friendslist.map((chat) => (
              <li
                key={chat.id}
                className="flex items-center justify-between bg-blue-100 rounded-xl p-3 shadow-sm hover:shadow-md transition"
              >
                <span className="text-blue-800 font-medium">
                  {chat.first_name} {chat.last_name}
                </span>
                <button 
                onClick={()=> handleChat(chat)}
                className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                  Chat
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No friends yet.</p>
        )}
      </div>
    </div>
  );
}