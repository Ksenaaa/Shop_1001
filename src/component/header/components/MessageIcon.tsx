import React, { useCallback } from 'react'
import { useNavigate } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';

import { RouteNames } from '../../../interface/IRoute';
import { useStyles } from '../style';

export const MessageIcon = () => {
    const navigate = useNavigate()

    const classes = useStyles()

    const count = 0

    const handlerToMessagesPage = useCallback(() => 
        navigate(RouteNames.MESSAGES)
    , [])

    return (
        <IconButton color="inherit" onClick={handlerToMessagesPage}>
            {!!count &&
                <div className={classes.badge}>
                    {count}
                </div>
            }
            <MailIcon />
        </IconButton>
    )
}
