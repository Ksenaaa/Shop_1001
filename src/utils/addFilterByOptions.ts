import { FilterOption } from "../component/filter-sort/constants"
import { IFilter, RangeFilter } from "../interface/IFilter"

type AddFilterByOptionsType = {
   prevFilter: IFilter, 
   name: string, 
   item: string | RangeFilter, 
   type: string,
}

export const addFilterByOptions = ({ prevFilter, name, item, type }: AddFilterByOptionsType): IFilter => {
   const removeName = Object.fromEntries(Object.entries(prevFilter).filter(option => option[0] !== name))
   
   if (type === FilterOption.Checkbox) {
      const prevNameCheckbox = prevFilter[name as keyof IFilter] as string[] || []
      const hasItemCheckbox = prevNameCheckbox?.find((filterItem) => item === filterItem)
      const removeItemCheckbox = prevNameCheckbox.filter((filterItem) => item !== filterItem)

      if (!!hasItemCheckbox) {
         if (prevNameCheckbox.length > 1) {
            return { ...prevFilter, [name]: [ ...removeItemCheckbox ] }
         }
         return { ...removeName } 
      }
      return { ...prevFilter, [name]: [...prevNameCheckbox, item] }
   }
    
   if (type === FilterOption.Range) {
      const prevNameInput = prevFilter[name as keyof IFilter] as RangeFilter || {} 
      const sumItemOptionInput = Object.values({ ...prevNameInput, ...item as RangeFilter } as string[])
         .reduce((sum: number, item: string) => sum + +item, 0)
      
      if (sumItemOptionInput === 0) {
         return removeName
      }
      return { ...prevFilter, [name]: { ...prevNameInput, ...item as RangeFilter } }
   }

   return prevFilter
}
