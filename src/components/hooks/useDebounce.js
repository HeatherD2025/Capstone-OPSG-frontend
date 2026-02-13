import { useState, useEffect } from "react";

// separate typing state from query state
// UI response for typing state, debounced value for query to limit unecesary calls
// if debouncedTerm exists, show searchedUsers, else show allUsers
// when user clears input, debouncedTerm becomes undefined and all users UI takes back over
// remember to apply debounce delay to clearing the input field
// states to define - 
//     not searching (allUsers shown, debounced term undefined)
//     loading (debouncedTerm exists, loadingSearch becomes true, display spinner)
//     search completed (debouncedTerm exists, loadingSearch becomes false, searchedUsers shown)

