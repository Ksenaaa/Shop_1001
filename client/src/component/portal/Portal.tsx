import React, { FC, ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

type Props = {
    children: ReactNode,
}

export const Portal: FC<Props> = ({ children }) => {
    const [container] = useState(() => document.createElement('div'))

    useEffect(() => {
        document.body.appendChild(container)
        return () => {
            document.body.removeChild(container)
        }
    }, [])

    return createPortal(children, container)
}
