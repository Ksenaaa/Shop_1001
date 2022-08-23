import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@material-ui/core'

import './style.css'

export const GoBackPage = () => {
    const navigate = useNavigate()

    const goToBack = useCallback(() => 
        navigate(-1)
    , [])

    return (
        <div className="wrapperClosePage">
            <Button variant="text" color="secondary" onClick={goToBack}>
                Go back
            </Button>
        </div>
    )
}
