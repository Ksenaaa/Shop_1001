import React, { FC, useCallback } from 'react'

import { NestedListItem } from '../../nestedList/NestedListItem'

type Props = {
    option: string,
    onSelection: (name: string) => void,
}
  
export const SortModalItem: FC<Props> = ({ onSelection, option }) => {
    const handleClick = useCallback(() => onSelection(option), [])

    return <NestedListItem itemText={option} onClick={handleClick}/>
}
