import { ChangeEvent } from "react"

import { IBook } from "../interface/IBook"
import { parceStringToNumberAndPoint } from "./parceStringToNumberAndPoint"

export const addFieldToBook = (
    prevForm: Record<string, keyof Omit<IBook, 'idBook'>>, 
    { target }: ChangeEvent<HTMLInputElement>
) => {
    let newValue: File | string = target?.value

    if (target.name === 'price') {
        newValue = parceStringToNumberAndPoint(newValue)
    } else if (target.type === 'file') {
        newValue = target?.files?.[0] as File
    }

    return ({ ...prevForm, [target.name]: newValue } as Record<string, keyof Omit<IBook, 'idBook'>>)
} 
