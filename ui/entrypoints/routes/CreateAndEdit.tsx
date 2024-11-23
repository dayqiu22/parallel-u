import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button,
    TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { addSnippet, clearCurrentSnippet, removeSnippet, setNotNew } from '@/state/snippets/snippetsSlice';
import { setDiff } from '@/state/diff/diffSlice';

const CreateAndEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentSnippet = useSelector((state: RootState) => state.snippets.currentSnippet);
    const isNew = useSelector((state: RootState) => state.snippets.isNew);
    const [title, setTitle] = useState<string>(currentSnippet?.title || '');
    const [text, setText] = useState<string>(currentSnippet?.text || '');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const addSnippetAsync = async (title : string, text : string) => {
        try {
            const response = await fetch(`http://localhost:8080/add_snippet?title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`, { method: 'POST'});
        } catch (error) {
            console.error(error);
        }
    }

    const updateSnippetAsync = async (oldTitle : string, newTitle : string, text : string) => {
        try {
            const response = await fetch(`http://localhost:8080/update_snippet?oldTitle=${encodeURIComponent(oldTitle)}&newTitle=${encodeURIComponent(newTitle)}&text=${encodeURIComponent(text)}`, { method: 'PUT'});
        } catch (error) {
            console.error(error);
        }
    }

    const handleSave = () => {
        if (isNew) {
            dispatch(addSnippet({ title: title, text: text }));
            addSnippetAsync(title, text);
        } else {
            if (title !== currentSnippet?.title) {
                dispatch(removeSnippet(currentSnippet?.title || ''));
            }
            dispatch(addSnippet({ title: title, text: text }));
            updateSnippetAsync(currentSnippet?.title || '', title, text);
        }

        dispatch(clearCurrentSnippet());
        dispatch(setNotNew());
        dispatch(setDiff());
        navigate('/');
    }

    return (
        <Box>
            <Box style={{ marginBottom: '2rem' }}>
                <TextField
                    id='snippet-title'
                    margin='normal'
                    fullWidth 
                    label='Snippet Title'
                    value={title}
                    onChange={handleTitleChange}
                />

                <TextField
                    id='snippet-text'
                    multiline
                    margin='normal'
                    fullWidth
                    rows={5}
                    label='Snippet Text'
                    value={text}
                    onChange={handleTextChange}
                />
            </Box>

            <Box>
                <Button 
                    variant="contained" 
                    disabled={
                        !(title !== (currentSnippet?.title) || text !== (currentSnippet?.text)) || (title == '' || text == '')
                    } 
                    onClick={handleSave}
                >
                    Save
                </Button>
                <Link to='/' onClick={() => {
                    dispatch(clearCurrentSnippet())
                    dispatch(setNotNew())
                }}>
                    <Button variant="text" style={{ color: '#d1c4e9' }}>
                        Cancel
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default CreateAndEdit;