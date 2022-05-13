import React from 'react'

export const errorsForNameData = ({name, errors}:any) => {
    if(!errors?.length) return ''

    return errors
        .map((err:any)=> (err.nameData === name) ? err.errorText : '')
        .filter((err:any) => err)
        .join(' ')
}