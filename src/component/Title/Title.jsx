import React from 'react'

const Title = ({ text }) => {
    return (
        <div className="flex justify-center">
            <h2 className="relative text-3xl font-bold text-gray-800 overflow-hidden">
                {text}
                <span className="absolute inset-0 w-[180%] bg-gradient-to-r from-transparent via-white/100 to-transparent opacity-90 animate-shine"></span>
            </h2>
        </div>
    )
}

export default Title