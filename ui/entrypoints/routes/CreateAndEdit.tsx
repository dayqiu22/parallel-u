import React, { useState, useEffect, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button,
    Menu,
    MenuItem,
    TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { clearCurrentSnippet } from '@/state/snippets/snippetsSlice';

const CreateAndEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentSnippet = useSelector((state: RootState) => state.snippets.currentSnippet);
    const [title, setTitle] = useState<string>(currentSnippet?.title || '');
    const [text, setText] = useState<string>(currentSnippet?.text || '');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleSave = () => {
        navigate('/');
        dispatch(clearCurrentSnippet());
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
                <Button variant="contained" disabled={!(title !== (currentSnippet?.title || '') || text !== (currentSnippet?.text || ''))} onClick={handleSave}>
                    Save
                </Button>
                <Link to='/'>
                    <Button variant="text" style={{ color: '#d1c4e9' }} onClick={() => dispatch(clearCurrentSnippet())}>
                        Cancel
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default CreateAndEdit;