import React, { ChangeEvent, FC, memo } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

type RadioButtonType = {
    onChange(e: ChangeEvent<HTMLInputElement>): void,
    name: string, 
}

export const RadioButtonRegistration: FC<RadioButtonType> = ({onChange, name}) => {

    return (
        <div >
            <FormControl component="fieldset">
                <RadioGroup name={name} onChange={onChange} defaultValue='buyer'>
                    <div className="wrapperRadio">
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="seller" control={<Radio />} label="Seller" />
                        <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
                    </div>
                </RadioGroup>
            </FormControl>
        </div>
    )
}
