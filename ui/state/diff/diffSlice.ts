import { createSlice } from "@reduxjs/toolkit"
import Snippet from "@/models/Snippet"

interface DiffState {
    isDiff: boolean
}

const initialState : DiffState = {
    isDiff: true
}

const diffSlice = createSlice({
    name: 'diff',
    initialState,
    reducers: {
        setDiff: (state) => {
            state.isDiff = true
        },
        unsetDiff: (state) => {
            state.isDiff = false
        }
    },
})

export const {setDiff, unsetDiff} = diffSlice.actions;

export default diffSlice.reducer;