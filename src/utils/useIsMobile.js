import { useState, useEffect } from "react";

const mobileBreakpoint = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < mobileBreakpoint)
    };

    checkMobile(); // my initial check when component mounts

    window.addEventListener('resize', checkMobile);

    return () => {
        // cleanup after mounting
        window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

export default useIsMobile;