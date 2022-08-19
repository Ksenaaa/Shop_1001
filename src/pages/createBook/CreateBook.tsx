import React, { ChangeEvent, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { Button } from '@material-ui/core'

import { useHttp } from '../../hooks/http.hook'
import { TextFields } from '../../component/input/Input'
import { RouteNames } from '../../interface/IRoute';
import { SelectComponent } from '../../component/select/SelectComponent';
import { SelectOption } from '../../component/select/SelectOption';
import { AuthContext } from '../../context/AuthContext';
import { InputUploadImg } from './components/InputUploadImg';
import { LoadingCircular } from '../../component/loading/LoadingCircular';
import { parceStringToNumberAndPoint } from '../../utils/parceStringToNumberAndPoint'
import { IBook } from '../../interface/IBook';
import { SnackbarAccepted } from '../../component/snackbar/SnackbarAccepted';
import { useToggle } from '../../hooks/toggle.hook';
import { selectOptionCategory, selectOptionLanguage, selectOptionYear } from './constants'

import './style.css'

export const CreateBook = () => {
    const [form, setForm] = useState<Record<string, keyof Omit<IBook, 'idBook'>>>({})
    const [messageCreated, setMessageCreated] = useState<string>('')
    
    const { userAuth } = useContext(AuthContext)
    
    const { loading, request, errorsValid } = useHttp()
    
    const { isOpen: isShowSnackbar, onToggle: toggleShowSnackbar } = useToggle()
    
    const closeCreatePage = useNavigate()

    const handlerChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
        let newValue: File | string = target?.value

        if (target.name === 'price') {
            newValue = parceStringToNumberAndPoint(newValue)
        } else if (target.type === 'file') {
            newValue = target?.files?.[0] as File
        }

        setForm({ ...form, [target.name]: newValue } as Record<string, keyof Omit<IBook, 'idBook'>>)
    }, [form]) 
    
    const handlerCreateBook = useCallback(async() => {
        const formData = new FormData()
        const newForm = { ...form, sellerId: userAuth.userId } as Record<string, keyof Omit<IBook, 'idBook'>>

        Object.keys(newForm).forEach((formKey) => { formData.append(formKey, newForm[formKey]) })

        const data = await request({ url: 'create/create-book', method: 'POST', body: formData, notJsonContent: true })

        if (data.status === 200) {
            setForm({})
            setMessageCreated(data.message)
            toggleShowSnackbar()
        }
    }, [form])
    
    const handlerToMainPage = useCallback(() => 
        closeCreatePage(RouteNames.MAIN)
    , [])

    const onCloseSnackbar = useCallback(() => {
        toggleShowSnackbar()
        setMessageCreated('')
    }, [toggleShowSnackbar])

    return (
        <form className="wrapper">
            {loading && <LoadingCircular/>}
            {isShowSnackbar &&
                <div className="wrapperSnackBar">
                    <SnackbarAccepted alertMessage={messageCreated} />
                    <div onClick={onCloseSnackbar} className="closeSnackbar" />
                </div>
            }
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
                    <SelectComponent
                        label="Language" 
                        name="language" 
                        value={form?.language || ''}
                        onChange={handlerChange}
                        errors={errorsValid}
                    >
                        <>
                            {selectOptionLanguage.map(option => <SelectOption value={option} key={option} />)}
                        </>
                    </SelectComponent>
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
                <div className="wrapperCloseWindow">
                    <Button variant="text" color="secondary" onClick={handlerToMainPage}>
                        Close
                    </Button>
                </div>
                <Button variant="outlined" color="secondary"  
                    onClick={handlerCreateBook}
                    disabled={loading}
                >
                    Create
                </Button>
            </div>
        </form>
    )
} 
