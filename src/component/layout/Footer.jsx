import React from 'react'
import Button from "../Button";

const Footer = () => {
    return (
        <div><Button label="Click" onClick={() => console.log("Click")} variant="default" disabled={true} /></div>
    )
}

export default Footer