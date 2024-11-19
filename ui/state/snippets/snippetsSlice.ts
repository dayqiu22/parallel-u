import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Snippet from "@/models/Snippet"

interface SnippetsState {
    snippets: Record<string, string>,
    currentSnippet: Snippet | null,
    isNew: boolean
}

const initialState : SnippetsState = {
    snippets : {},
    currentSnippet: null,
    isNew: false
}

const snippetsSlice = createSlice({
    name: 'snippets',
    initialState,
    reducers: {
        addSnippet: (state, action: PayloadAction<Snippet>) => {
            state.snippets = {...state.snippets, [action.payload.title]: action.payload.text}
        },
        removeSnippet: (state, action: PayloadAction<string>) => {
            const { [action.payload]: removedItem, ...restItems } = state.snippets;
            state.snippets = restItems
        },
        clearSnippets: (state) => {
            state.snippets = {}
        },
        setCurrentSnippet: (state, action: PayloadAction<string>) => {
            state.currentSnippet = { title: action.payload, text: state.snippets[action.payload]}
        },
        clearCurrentSnippet: (state) => {
            state.currentSnippet = null
        },
        setNew: (state) => {
            state.isNew = true
        },
        setNotNew: (state) => {
            state.isNew = false
        }
    },
})

export const {addSnippet, removeSnippet, clearSnippets, setCurrentSnippet, clearCurrentSnippet, setNew, setNotNew} = snippetsSlice.actions;

export default snippetsSlice.reducer;