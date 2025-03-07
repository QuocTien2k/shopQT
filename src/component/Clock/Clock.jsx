import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState(getCurrentTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Chuyển 0h thành 12h

        return {
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
            ampm,
        };
    }

    return (
        <div className="flex items-center gap-1">
            <span className="px-2 py-1 bg-red-500 text-white font-bold rounded">{time.hours}</span>:
            <span className="px-2 py-1 bg-red-500 text-white font-bold rounded">{time.minutes}</span>:
            <span className="px-2 py-1 bg-red-500 text-white font-bold rounded">{time.seconds}</span>
            <span className="ml-1 font-semibold">{time.ampm}</span>
        </div>
    );
};

export default Clock;
