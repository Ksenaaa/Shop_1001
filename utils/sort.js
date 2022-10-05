const { SORT_FIELD_DB, SORT_ORDER } = require("../constants")

const sortByField = (allBooks, fieldSort, orderSort) => {
    const sortFieldDB = SORT_FIELD_DB[fieldSort]

    return allBooks.sort((bookA, bookB) => {
        if (sortFieldDB === SORT_FIELD_DB.name) {
            if (orderSort === SORT_ORDER.asc) {
                if (bookA[sortFieldDB] > bookB[sortFieldDB]) return 1 
                return -1
            }
            if (bookA[sortFieldDB] < bookB[sortFieldDB]) return 1 
            return -1
        }
        if (orderSort === SORT_ORDER.asc) {
            return bookA[sortFieldDB] - bookB[sortFieldDB] 
        }
        return bookB[sortFieldDB] - bookA[sortFieldDB]
    })
}

module.exports = sortByField
