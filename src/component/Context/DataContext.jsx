import React, { createContext, useState } from 'react'

// Tạo context
export const DataContext = createContext();
const ContextProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    return (
        <DataContext.Provider value={{ isModalOpen, setIsModalOpen, handleOpenModal, handleCloseModal }}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextProvider