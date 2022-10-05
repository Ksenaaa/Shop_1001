import React, { ChangeEvent, FC } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

type Props = {
    onChange(e: ChangeEvent<HTMLInputElement>): void,
    name: string, 
}

export const RadioButtonRegistration: FC<Props> = ({ onChange, name }) => (
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
