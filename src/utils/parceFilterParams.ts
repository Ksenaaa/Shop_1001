import { RangeFilter } from "../interface/IFilter"

export const onParseFilter = (filterStr: string | null) => {
   if (!filterStr) return null

   let filters: Record<string, string[] | RangeFilter> = {}
   let parse = filterStr?.split(';')?.map((option: string) => option.split('='))
    
   parse?.map((option: string[]) => {
      const parseItem = option[1]?.split(',')
      const optionItemInput = parseItem.reduce((acc: RangeFilter, i: string) =>  
         ({ ...acc, [i.split(':')[0]]: i.split(':')[1] }), {})
      const hasInputItem = Object.keys(optionItemInput).includes('from') || Object.keys(optionItemInput).includes('to')

      filters[option[0]] = hasInputItem ? optionItemInput : parseItem
   })

   return filters
}  
