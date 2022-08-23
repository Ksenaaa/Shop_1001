import React, { ChangeEvent, FC, useCallback } from 'react'
import { Button } from '@material-ui/core';

import { TextFields } from '../input/Input'
import { SelectComponent } from '../select/SelectComponent';
import { SelectOption } from '../select/SelectOption';
import { InputUploadImg } from './components/InputUploadImg';
import { IBook } from '../../interface/IBook';
import { ErrorType } from '../../utils/ErrorsHanding';
import { selectOptionCategory, selectOptionLanguage, selectOptionYear } from './constants'
import { LoadingCircular } from '../../component/loading/LoadingCircular';
import { SnackbarAccepted } from '../snackbar/SnackbarAccepted';
import { GoBackPage } from '../goBackPage/GoBackPage';

import './style.css'

type Props = {
    namePage: string,
    form: Record<string, keyof Omit<IBook, 'idBook'>>,
    setFormBook: (target: ChangeEvent<HTMLInputElement>) => void,
    loading: boolean,
    errorsValid: ErrorType[] | null,
    messageCreated: string,
    isShowSnackbar: boolean,
    onCloseSnackbar: () => void,
    handlerCreateBook: () => Promise<void>,
    buttonCreateName: string,
    isEdit?: boolean,
}
  
export const FieldsForBook: FC<Props> = ({ namePage, form, isEdit, setFormBook, loading, errorsValid, messageCreated, isShowSnackbar, onCloseSnackbar, handlerCreateBook, buttonCreateName }) => {  
    const handlerChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
        setFormBook({ target } as ChangeEvent<HTMLInputElement>)
    }, []) 

    return (
        <>
            <GoBackPage />
            <form className="wrapper">
                {loading && <LoadingCircular/>}
                {isShowSnackbar &&
                    <div className="wrapperSnackBar">
                        <SnackbarAccepted alertMessage={messageCreated} />
                        <div onClick={onCloseSnackbar} className="closeSnackbar" />
                    </div>
                }
                <div className="wrapperTitle">
                    <h2>{namePage}</h2>
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
                            value={form?.img || ''}
                            onChange={handlerChange} 
                            errors={errorsValid}
                        />
                    </div>
                </div>
                <div className="buttonWrapper">
                    <Button variant="outlined" color="secondary"  
                        onClick={handlerCreateBook}
                        disabled={loading}
                    >
                        {buttonCreateName}
                    </Button>
                </div>
            </form>
        </>
    )
} 
