import { useState } from "react";
import AdminEditUserProfile from "./AdminViewUserProfile";
import AdminSearch from "./AdminSearch";

export default function AdminUsers() {
    const [selectedUser, setSelectedUser] = useState(null)

    return (
        <>
         {!selectedUser ? (
            <AdminSearch onSelectUser={setSelectedUser}/>
          ) : (
            <AdminEditUserProfile 
              user={selectedUser}
              onReturnToResults={() => setSelectedUser(null)}  
            />
            )};
        </>
    );
}