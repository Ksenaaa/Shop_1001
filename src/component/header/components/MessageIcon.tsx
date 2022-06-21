import React, { useCallback } from 'react'
import { useNavigate } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';

import { useStyles } from '../style';
import { RouteNames } from '../../../interface/IRoute';

export const MessageIcon = () => {
    const navigate = useNavigate()

    const classes = useStyles()

    const handlerToMessagesPage = useCallback(() => {
        navigate(RouteNames.MESSAGES)
    }, [])

    return (
        <IconButton color="inherit" onClick={handlerToMessagesPage}>
            <div className={classes.badge}>
                2
            </div>
            <MailIcon />
        </IconButton>
    )
}
