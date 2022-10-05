import React, { useCallback, useState } from 'react'

export const useToggle = (initialState = false) => {
    const [isOpen, setOpen] = useState(initialState)
    
    const onToggle = useCallback(() => setOpen(prevState => !prevState), [])
    
    return { isOpen, onToggle }
}
