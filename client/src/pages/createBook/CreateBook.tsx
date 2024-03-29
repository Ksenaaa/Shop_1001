import React, { ChangeEvent, useCallback, useContext, useState } from 'react'

import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext';
import { IBook } from '../../interface/IBook';
import { useToggle } from '../../hooks/toggle.hook';
import { BookForm } from '../../component/bookForm/BookForm';
import { addFieldToBook } from '../../utils/addFieldToBook';

export const CreateBook = () => {
    const [form, setForm] = useState<Record<string, keyof Omit<IBook, 'idBook'>>>({})
    const [messageCreated, setMessageCreated] = useState<string>('')
    
    const { isOpen: isShowSnackbar, onToggle: toggleShowSnackbar } = useToggle()

    const { userAuth } = useContext(AuthContext)
    
    const { loading, request, errorsValid } = useHttp()
    
    const setFormBook = useCallback((target: ChangeEvent<HTMLInputElement>) => 
        setForm(prevForm => addFieldToBook(prevForm, target))
    , [])

    const handlerCreateBook = useCallback(async() => {
        const formData = new FormData()
        const newForm = { ...form, sellerId: userAuth.userId } as Record<string, keyof Omit<IBook, 'idBook'>>

        Object.keys(newForm).forEach((formKey) => formData.append(formKey, newForm[formKey]))

        const data = await request({ url: 'create/create-book', method: 'POST', body: formData, notJsonContent: true })

        if (data.status === 200) {
            setForm({})
            setMessageCreated(data.message)
            toggleShowSnackbar()
        }
    }, [form, request, toggleShowSnackbar, userAuth.userId])
    
    const onCloseSnackbar = useCallback(() => 
        toggleShowSnackbar()
    , [toggleShowSnackbar])

    return (
        <BookForm 
            namePage='New Book'
            form={form}
            setFormBook={setFormBook}
            loading={loading}
            errorsValid={errorsValid}
            messageCreated={messageCreated}
            isShowSnackbar={isShowSnackbar}
            onCloseSnackbar={onCloseSnackbar}
            handlerCreateBook={handlerCreateBook}
            buttonCreateName='Create'
        />
    )
} 
