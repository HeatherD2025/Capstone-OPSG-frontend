import { useEffect, useRef } from "react";

const useIdleTimer = ({ timeout = 10 * 60 * 1000, onIdle }) => {
  
  // useRef so we store data without re-rendering
  const idleTriggered = useRef(false)

    useEffect(() => {

      const updateActivity = () => {
        // Store last activity timestamp
        localStorage.setItem('lastActivity', Date.now());
        idleTriggered.current = false;
      };
      // Track activity
      const events = [
        'mousedown', 
        'mousemove', 
        'keydown', 
        'scroll', 
        'touchstart'
      ];

      events.forEach(event => {
        window.addEventListener(event, updateActivity);
      });

      // Initialize timestamp
      updateActivity();

      const interval = setInterval(() => {

        const userLastActive = Number(localStorage.getItem('lastActivity'));
        const currentTime = Date.now();

        if (!idleTriggered.current && currentTime - userLastActive > timeout) {
          idleTriggered.current = true;

          if (onIdle) {
            onIdle();
          }
        }

      }, 5000); // runs check every 5s

      // cleanup listeners
      return () => {
        events.forEach(event => 
          window.removeEventListener(event, updateActivity)
        );
        clearInterval(interval);
      };

    }, [timeout, onIdle]);
  };

export default useIdleTimer;
