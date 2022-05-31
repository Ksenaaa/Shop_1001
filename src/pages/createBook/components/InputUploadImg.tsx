import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { errorsForNameData, ErrorType } from "../../../utils/ErrorsHanding"

import '../style.css'

type InputFileType = {
    onChange(e: ChangeEvent<HTMLInputElement>): void, 
    errors: ErrorType[] | null,
    type: string,
    name: string,
    value?: File | null
}

export const InputUploadImg: FC<InputFileType> = ({onChange, errors, type, name, value}) => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [img, setImg] = useState<Blob | MediaSource | null>(null)

    useEffect(() => {
        setImageUrl('')
        setImg(null)
        if(!img) return
        setImageUrl(URL.createObjectURL(img))
    }, [value])

    const onChangeHandler = useCallback((e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        setImg(file)
    }, [img])

    const error = useMemo(() => errorsForNameData({name, errors}), [name, errors]) 

    return (
        <>
        <div 
            className="wrapperInputImg" 
            onChange={onChange}
        >
            <input
                type={type}
                name={name} 
                onChange={onChangeHandler}
                className="inputImg"
            />
            {imageUrl &&
                <img src={imageUrl} />
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
