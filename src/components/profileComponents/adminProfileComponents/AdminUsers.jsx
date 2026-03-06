import { useState } from "react";
import EditProfile from "../EditProfile";
import AdminSearch from "./AdminSearch";

export default function AdminUsers() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      {!selectedUser ? (
        <AdminSearch onSelectUser={setSelectedUser} />
      ) : (
        <EditProfile
          onSelectUser={setSelectedUser}
          onReturnToResults={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}
