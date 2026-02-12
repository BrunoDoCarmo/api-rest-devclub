"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { formatTime } from "../utils/formatoHora";

const INACTIVITY_TIME = 4 * 60 * 1000; // 4 Minutos
const ACTIVITY_KEY = "lastActivity";

export default function IdleTimer() {
    const pathname = usePathname();
    const [remainingTime, setRemainingTime] = useState<number>(INACTIVITY_TIME);

    const lastLocalActivityRef = useRef<number | null>(0);

    const logout = useCallback(() => {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        localStorage.removeItem(ACTIVITY_KEY);
        window.location.href ="/login"; 
    }, []);

    const recordLocalActivity = useCallback(() => {
        const now = Date.now();
        lastLocalActivityRef.current = now;
        localStorage.setItem(ACTIVITY_KEY, now.toString());
    }, []);

    useEffect(() => {
        if (pathname === "/login") return;
        const interval = setInterval(() => {
            const token = Cookies.get("token");
            if (!token) {
                window.location.href = "/login";
                return;
            } 

            const now = Date.now();
            const localDiff = now - lastLocalActivityRef.current!;
            if (localDiff >= INACTIVITY_TIME) {
                const globalActivity = localStorage.getItem(ACTIVITY_KEY);
                const globalDiff = globalActivity ? now - parseInt(globalActivity) : localDiff;

                if (globalDiff < INACTIVITY_TIME) {
                    lastLocalActivityRef.current = now;
                    setRemainingTime(INACTIVITY_TIME);
                } else {
                    logout();
                }
            } else {
            setRemainingTime(INACTIVITY_TIME - localDiff);
            }
        }, 1000);

        const events = [
            "mousedown",
            "mousemove",
            "keypress",
            "scroll",
            "touchstart",
            "wheel"
        ];
        events.forEach((event) => {
            window.addEventListener(
                event,
                recordLocalActivity,
                {
                    capture: true,
                    passive: true
                }
            )
        });
        
        return () => {
            clearInterval(interval);
            events.forEach((event) => window.removeEventListener(event, recordLocalActivity));
        };
    }, [recordLocalActivity, logout, pathname]);

    if (pathname === "/login" || !Cookies.get("token")) return null;
    
    
    return (
        <div className="flex items-center gap-2 rounded-full px-1 py-1 text-[9px] font-mono 
            text-white transition-colors duration-500">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-zinc-300">
                Expira em: 
            </span>
            <span className="font-bold text-green-400">
                {formatTime(remainingTime)}
            </span>
        </div>
    );
}