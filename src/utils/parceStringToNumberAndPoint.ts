export const parceStringToNumberAndPoint = (value: string) => 
    value.replace(/[^0-9.]/g, '').replace(/^(\d[^.]*\.)|\./g, '$1') 
