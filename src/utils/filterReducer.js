export const filterReducer = (state, action) => {
    switch(action.type) {
        case "LOAD_FILTER_PRODUCTS":
            const payloadArray = Array.isArray(action.payload) ? action.payload : [];
            // console.log(payloadArray);
            return {
                ...state,
                filterProducts: [...payloadArray],
                allProducts: [...payloadArray],
            }
        
        case "SET_GRIDVIEW": 
            return {
                ...state,
                gridView: true
            }

            case "SET_LISTVIEW": 
            return {
                ...state,
                gridView: false
            } 
        
        case "GET_SORT_VALUE":
            let useSortValue = document.getElementById("sort")
            let sortValue = useSortValue.options[useSortValue.selectedIndex].value
            console.log(sortValue);
            return {
                ...state,
                sortingValue: sortValue
            }

        default:
            return state
    }
}
