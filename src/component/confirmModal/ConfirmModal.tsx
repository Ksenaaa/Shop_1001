import React, { FC, useCallback } from 'react'
import { Button } from '@material-ui/core'

import { Portal } from '../portal/Portal'

import './style.css'

type Props = {
    askConfirm: string,
    onConfirm: (answer: boolean) => void,
}

enum possibleAnswer {
    YES = 'yes',
    NO = 'no',
}

export const ConfirmModal: FC<Props> = ({ askConfirm, onConfirm }) => {
    const onAccept = useCallback(() => onConfirm(true), [onConfirm])
    const onDecline = useCallback(() => onConfirm(false), [onConfirm])

    return (
        <Portal>
            <div className="wrapperConfirmModal">
                <div className="confirmModal">
                    <div className="askConfirmModal">
                        {askConfirm}
                    </div>
                    <div className="buttonConfirmModal">
                        <Button variant="contained" color="secondary" onClick={onAccept}>
                            {possibleAnswer.YES}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onDecline}>
                            {possibleAnswer.NO}
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
