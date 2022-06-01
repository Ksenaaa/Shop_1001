import React from 'react'

type ErrorsType = {
    errors: ErrorType[] | null,
    name: string,
}

export type ErrorType = {
    errorText: string,
    errorField: string,
}

export const handleErrors = ({name, errors}: ErrorsType) => {
    if(!errors?.length) return ''

    return errors
        .map(err => (err.errorField === name) ? err.errorText : '')
        .filter((err: string) => err)
        .join(' ')
}
