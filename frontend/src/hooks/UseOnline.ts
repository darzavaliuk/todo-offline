import {useState, useEffect} from "react";

function getIsOnline() {
    if (typeof window === "undefined") {
        return null;
    }
    return navigator.onLine;
}

function useOnline() {
    const [isOnline, setIsOnline] = useState(() => getIsOnline());

    function setOffline() {
        setIsOnline(false);
    }

    function setOnline() {
        setIsOnline(true);
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("online", setOnline);
            window.addEventListener("offline", setOffline);

            return () => {
                window.removeEventListener("online", setOnline);
                window.removeEventListener("offline", setOffline);
            };
        } else {
            return () => {
            };
        }
    }, []);

    return isOnline;
}

export {useOnline};