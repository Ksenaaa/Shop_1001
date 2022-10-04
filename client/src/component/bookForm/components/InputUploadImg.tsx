import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { handleErrors, ErrorType } from "../../../utils/ErrorsHanding"

import '../style.css'

type Props = {
    onChange(e: ChangeEvent<HTMLInputElement>): void, 
    errors: ErrorType[] | null,
    type: string,
    name: string,
    value: File | null | string,
}

export const InputUploadImg: FC<Props> = ({ onChange, errors, type, name, value }) => {
    const [imageUrl, setImageUrl] = useState<string>('')

    useEffect(() => {
        if (!value) {
            setImageUrl('')
            return
        }

        if (typeof value === 'string') {
            setImageUrl(`${process.env.REACT_APP_API_URL}${value}`)
            return
        }

        setImageUrl(URL.createObjectURL(value))
    }, [value])
    
    const error = useMemo(() => handleErrors({ name, errors }), [name, errors]) 

    return (
        <>
            <div 
                className="wrapperInputImg" 
                onChange={onChange}
            >
                <input
                    type={type}
                    name={name} 
                    className="inputImg"
                />
                {imageUrl &&
                    <img src={imageUrl} alt="book"/>
                }
                <div className="inputImgIcon">
                    <AddCircleOutlineIcon />
                </div>
            </div>
            <div className="InputImgError">
                {error}
            </div>
        </>
    )
}
