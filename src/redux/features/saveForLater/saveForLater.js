import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    savedItems: localStorage.getItem("savedItems") ? JSON.parse(localStorage.getItem("savedItems")) : []
}
export const saveForLaterSlice = createSlice({
    name: 'savedItems',
    initialState,
    reducers: {
        addToSavedItem: (state, action) => {
            //    if the facility is already exists in the savedItem don't add it again.
            let existingSavedItem = state.savedItems?.findIndex(item => item._id === action.payload?._id)
            if (existingSavedItem >= 0) {
                alert('This product is already in your saved items. Wanna remove?')
            }
            else {
                let buildSavedItem = { ...action.payload }
                state.savedItems.push(buildSavedItem)
                localStorage.setItem('savedItems', JSON.stringify(state.savedItems))
            }
        },
        //remove from savedItem
        removeSavedItem: (state, action) => {
            const updatedSavedItem = state.savedItems?.filter((item) => item?._id !== action.payload?._id)
            state.savedItems = updatedSavedItem;
            localStorage.setItem("savedItems", JSON.stringify(state.savedItems));
        },
        clearSavedItem: (state) => {
            state.savedItems = [];
            localStorage.setItem("savedItems", JSON.stringify(state.savedItems));
        }
    }
})
export default saveForLaterSlice.reducer
export const { addToSavedItem, removeSavedItem, clearSavedItem } = saveForLaterSlice.actions