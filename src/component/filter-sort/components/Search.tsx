import React, { ChangeEvent, useCallback, useContext } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { FilterSortContext } from '../../../context/FilterSortContext';
import { useStyles } from '../style';

export const Search = () => {
    const classes = useStyles()

    const { onSearch, searchText } = useContext(FilterSortContext)

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => 
        onSearch(e.target.value)
    , [])

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
                value={searchText || ''}
            />
        </div>
    )
}
