import { useEffect, useRef, useState } from "react";
import { Spin } from "antd";

const ButtonJSX = ({ label, onClick, disabled, variant = "primary" }) => {
    const [loading, setLoading] = useState(false);
    const labelRef = useRef(null);
    const [buttonWidth, setButtonWidth] = useState("auto");

    useEffect(() => {
        if (labelRef.current) {
            setButtonWidth(`${labelRef.current.offsetWidth + 32}px`);
        }
    }, [label]);

    const handleClick = () => {
        if (onClick && !disabled) {
            setLoading(true);
            onClick();
            setTimeout(() => setLoading(false), 1500);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled || loading}
            className={`custom-btn ${variant} ${loading ? "loading" : ""}`}
            style={{ width: buttonWidth }}
        >
            <span ref={labelRef} style={{ visibility: loading ? "hidden" : "visible" }}>
                {label}
            </span>
            {loading && <Spin size="small" className="spin-overlay" />}
        </button>
    );
};

export default ButtonJSX;

