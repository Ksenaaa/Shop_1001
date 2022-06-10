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
import { parceStringToNumberAndPoint } from '../../utils/parceStringToNumberAndPoint'
import { IFormBook } from '../../interface/IBook';

import { selectOptionCategory, selectOptionYear } from './constants'

import './style.css'

export const CreateBook = () => {
    const [form, setForm] = useState<Record<string, keyof IFormBook>>({})

    const { userAuth } = useContext(AuthContext)

    const { loading, request, errorsValid } = useHttp()
    
    const closeCreatePage = useNavigate()

    const handlerChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
        let newValue: File | string = target?.value

        if (target.name === 'price') {
            newValue = parceStringToNumberAndPoint(newValue)
        } else if (target.type === 'file') {
            newValue = target?.files?.[0] as File
        }

        setForm({ ...form, [target.name]: newValue } as Record<string, keyof IFormBook>)
    }, [form]) 
    
    const createBookHandler = useCallback(async() => {
        const formData = new FormData()
        const newForm = { ...form, sellerId: userAuth.userId } as Record<string, keyof IFormBook>

        Object.keys(newForm).forEach((formKey) => { formData.append(formKey, newForm[formKey]) })

        const data = await request({ url: 'create/create-book', method: 'POST', body: formData, notJsonContent: true })

        if(data.status === 200) {
            setForm({})
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
                        onChange={handlerChange}
                        errors={errorsValid}
                    />
                    <TextFields
                        label="Author" 
                        type="text" 
                        name="author" 
                        value={form?.author || ''}
                        onChange={handlerChange}
                        errors={errorsValid}
                    />
                    <SelectComponent
                        label="Category" 
                        name="category" 
                        value={form?.category || ''}
                        onChange={handlerChange}
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
                        onChange={handlerChange}
                        errors={errorsValid}
                    />
                    <SelectComponent
                        label="Year" 
                        name="year" 
                        value={form?.year || ''}
                        onChange={handlerChange}
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
                        onChange={handlerChange}
                        errors={errorsValid}
                    />
                    <TextFields
                        label="Price" 
                        type="text" 
                        name="price" 
                        value={form?.price || ''}
                        onChange={handlerChange}
                        errors={errorsValid}
                    />
                </div>
                <div  >
                    <InputUploadImg 
                        type="file" 
                        name="img" 
                        value={(form?.img as unknown as File) || ''}
                        onChange={handlerChange} 
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
