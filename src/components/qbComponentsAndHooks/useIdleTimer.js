import { useEffect, useRef, useState, useDispatch } from "react";


// Track activity
// mouse
// keyboard
// scroll
// focus

// Store last activity timestamp
// useRef (no re-renders)

// Idle timer checks elapsed time
// setInterval or setTimeout

// compare Date.now() to last activity
// When threshold exceeded

// mark sessionShouldEnd = true

// Effect reacts
// dispatch logout
// clear client state
// attempt revoke API call

// Server handles real revocation
// invalidate refresh token
// reject future refresh attempts

// Hook detects condition - Think of useIdleTimer as answering one question:
// “Should this session still exist?”

// It does not:
// manage tokens directly
// validate JWTs
// guarantee revocation

// It does:
// track activity
// detect inactivity

// trigger logout behavior
// → Dispatch logout (client state)
// → Fire logout / revoke API call
// → Server invalidates refresh token

export default function useIdleTimer() {
//   const currentTokens = useRef(accessToken, refreshToken);
  const [sessionShouldEnd, setSessionShouldEnd] = useState();

  useEffect = (() => {
    if (tokensExpired) {
    } 
  })
}