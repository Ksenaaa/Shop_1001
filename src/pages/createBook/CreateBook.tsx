import React, { ChangeEvent, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHttp } from '../../hooks/http.hook'
import { TextFields } from '../../component/input/Input'
import { RouteNames } from '../../interface/IRoute';
import { SelectComponent } from '../../component/select/SelectComponent';
import { SelectOption } from '../../component/select/SelectOption';
import { AuthContext } from '../../context/AuthContext';
import { InputUploadImg } from './components/InputUploadImg';
import { LoadingCircular } from '../../component/loading/LoadingCircular';
import { selectOptionCategory, selectOptionYear } from './constants'

import './style.css'

type FormBookType = {
    bookName: string, 
    author: string,
    category: string,
    page: string,
    year: string,
    language: string,
    price: string,
    img: File | null,
    sellerId: string,
}

export const CreateBook = () => {
    const [form, setForm] = useState<Record<string, keyof FormBookType>>({})
    const {userAuth} = useContext(AuthContext)
    const {loading, request, errorsValid, clearError} = useHttp()
    const closeCreatePage = useNavigate()

    const changeHandler = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
        const value = (target.type === 'file') ? target?.files?.[0] : 
            (target.name === 'price') ? target.value.replace(/[^0-9.]/g, '').replace(/^(\d[^.]*\.)|\./g, '$1') :
                target.value
        setForm({ ...form, [target.name]: value} as Record<string, keyof FormBookType>)
    }, [form]) 

    const createBookHandler = useCallback(async() => {
        const formData = new FormData()

        Object.keys(form).forEach((formKey) => {formData.append(formKey, form[formKey])})

        formData.append('sellerId', userAuth.userId)

        const data = await request({ url: 'api/create/create-book', method: 'POST', body: formData, notJsonContent: true})
        
        if(data.status === 200) {
            setForm({})
            clearError()
        }
    }, [form])
    
    return (
        <form className="wrapper">
            {loading && <LoadingCircular/>}
            <div className="wrapperTitle">
                <h2>New Book</h2>
            </div>

            <div className="wrapperInput">
                <div className="wrapperInputText">
                    <TextFields
                        label="Book name" 
                        type="text" 
                        name="bookName" 
                        value={form?.bookName || ''}
                        onChange={changeHandler}
                        errors={errorsValid}
                    />
                    <TextFields
                        label="Author" 
                        type="text" 
                        name="author" 
                        value={form?.author || ''}
                        onChange={changeHandler}
                        errors={errorsValid}
                    />
                    <SelectComponent
                        label="Category" 
                        name="category" 
                        value={form?.category || ''}
                        onChange={changeHandler}
                        errors={errorsValid}
                    >
                        <>
                        {selectOptionCategory.map(option => <SelectOption value={option} key={option} />)}
                        </>
                    </SelectComponent>
                    <TextFields
                        label="Page" 
                        type="text" 
                        name="page" 
                        value={form?.page || ''}
                        onChange={changeHandler}
                        errors={errorsValid}
                    />
                    <SelectComponent
                        label="Year" 
                        name="year" 
                        value={form?.year || ''}
                        onChange={changeHandler}
                        errors={errorsValid}
                    >
                        <>
                        {selectOptionYear().map(option => <SelectOption value={option} key={option} />)}
                        </>
                    </SelectComponent>
                    <TextFields
                        label="Language" 
                        type="text" 
                        name="language" 
                        value={form?.language || ''}
                        onChange={changeHandler}
                        errors={errorsValid}
                    />
                    <TextFields
                        label="Price" 
                        type="text" 
                        name="price" 
                        value={form?.price || ''}
                        onChange={changeHandler}
                        errors={errorsValid}
                    />
                </div>
                <div  >
                    <InputUploadImg 
                        type="file" 
                        name="img" 
                        value={(form?.img as unknown as File) || ''}
                        onChange={changeHandler} 
                        errors={errorsValid}
                    />
                </div>
            </div>

            <div className="buttonWrapper">
                <div className="wrapperCloseWindow" onClick={() => closeCreatePage(RouteNames.MAIN)}>
                    <ArrowBackIcon />
                    <h4>Close</h4>
                </div>
                <Button variant="outlined" color="secondary"  
                    onClick={createBookHandler}
                    disabled={loading}
                >
                    Create
                </Button>
            </div>

        </form>
    )
} 
