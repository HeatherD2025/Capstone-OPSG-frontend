import { useRef, useState } from "react";

// manage my recaptcha token
// expose helpers (getToken, reset)
// track errors
// be reuseable

export function useRecaptcha() {
  const recaptchaRef = useRef(null);
  const [ error, setError ] = useState("");


  const getToken = () => {
    const token = recaptchaRef.current?.getValue();

    if (!token) {
        setError("Please verify you're not a robot")
        return null;
    } 

    setError("");
    return token
  };

  const resetToken = () => {
    recaptchaRef.current?.reset();
    setError("")
  };

  return { 
    recaptchaRef,
    error,
    getToken,
    resetToken,
  };
}