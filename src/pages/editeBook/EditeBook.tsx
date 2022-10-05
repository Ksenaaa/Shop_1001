import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { BookForm } from '../../component/bookForm/BookForm'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useToggle } from '../../hooks/toggle.hook'
import { IBook } from '../../interface/IBook'
import { RouteNames } from '../../interface/IRoute'
import { addFieldToBook } from '../../utils/addFieldToBook'
import { normalizeBook } from '../../utils/normalizeBooks'

export const EditeBook = () => {
    const [form, setForm] = useState<Record<string, keyof Omit<IBook, 'idBook'>>>({})
    const [messageCreated, setMessageCreated] = useState<string>('')
    
    const navigate = useNavigate()
    
    const { isOpen: isShowSnackbar, onToggle: toggleShowSnackbar } = useToggle()
    
    const { userAuth } = useContext(AuthContext)
    
    const { loading, request, errorsValid } = useHttp()
    
    const { idBook } = useParams()
    
    const showBook = useCallback(async () => {
        const result = await request({ url: `books/${idBook}` })
        
        if (userAuth.userId === result.sellerId) {
            setForm(preForm => {
                let newform = Object.fromEntries(Object.entries(normalizeBook(result)).filter(item => item[0] !== 'idBook'))
                return { ...preForm, ...newform } as Record<string, keyof Omit<IBook, 'idBook'>>
            })    
        } else {
            setMessageCreated("It doesn't your book!") 
            toggleShowSnackbar()
            setTimeout(() => navigate(RouteNames.MAIN), 2000)
        }    
    }, [idBook, request, toggleShowSnackbar, navigate, userAuth.userId])    
    
    useEffect(() => {
        showBook()
    }, [showBook])    
    
    const setFormBook = useCallback((target: ChangeEvent<HTMLInputElement>) => 
        setForm(prevForm => addFieldToBook(prevForm, target))
    , [])    
    
    const handlerCreateBook = useCallback(async() => {
        const formData = new FormData()
        const newForm = { ...form } 
        
        Object.keys(newForm).forEach((formKey) => formData.append(formKey, newForm[formKey]))
        
        const data = await request({ url: `edite/edite-book/${idBook}`, method: 'PUT', body: formData, notJsonContent: true })
        
        if (data.status === 200) {
            setMessageCreated(data.message)
            toggleShowSnackbar()
            setTimeout(() => navigate(-2), 2000)
        }    
    }, [form, toggleShowSnackbar, request, idBook, navigate])    
    
    const onCloseSnackbar = useCallback(() => 
        toggleShowSnackbar()
    , [toggleShowSnackbar])
    
    return (
        <BookForm
            namePage='Edite Book'
            form={form}
            setFormBook={setFormBook}
            loading={loading}
            errorsValid={errorsValid}
            messageCreated={messageCreated}
            isShowSnackbar={isShowSnackbar}
            onCloseSnackbar={onCloseSnackbar}
            handlerCreateBook={handlerCreateBook}
            buttonCreateName='Edite'
        />
    )
} 
