import React, { useState } from 'react'

export const useToggle = (initialState = false) => {
    const [isOpen, setOpen] = useState(initialState)
    
    const onToggle = () => setOpen(prevState => !prevState)
    
    return { isOpen, onToggle }
}
