import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { handleErrors, ErrorType } from "../../../utils/ErrorsHanding"

import '../style.css'

type Props = {
    onChange(e: ChangeEvent<HTMLInputElement>): void, 
    errors: ErrorType[] | null,
    type: string,
    name: string,
    value?: File | null
}

export const InputUploadImg: FC<Props> = ({ onChange, errors, type, name, value }) => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [img, setImg] = useState<Blob | MediaSource | null>(null)

    useEffect(() => {
        setImageUrl('')
        setImg(null)
        if(!img) return
        setImageUrl(URL.createObjectURL(img))
    }, [value])

    const onHandlerChange = useCallback((e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        setImg(file)
    }, [img])

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
                    onChange={onHandlerChange}
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
