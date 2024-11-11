import { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { 
    Box, 
    Button, 
    List, 
    ListItem,
    ListItemButton,
    ListItemIcon, 
    ListItemText,
    Tooltip,
    Menu,
    MenuItem,
    IconButton 
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PageviewIcon from '@mui/icons-material/Pageview';
import Snippet from "@/models/Snippet";
import { useSelector, useDispatch } from "react-redux";
import { addSnippet, setNew, setCurrentSnippet } from "@/state/snippets/snippetsSlice";
import { RootState } from '@/state/store';

import mockSnippets from '@/mock.json';

const Snippets = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const snippets = useSelector((state: RootState) => state.snippets.snippets);
    
    useEffect(() => {
        // Load snippets

        mockSnippets.map((snippet : Snippet) => {
            dispatch(addSnippet(snippet));
        })
    }, []);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const copySnippet = (title : string) => {
        navigator.clipboard.writeText(snippets[title] || '');
    }

    return (
        <Box>
            <List>
                <ListItem 
                    secondaryAction={
                        <IconButton aria-label="comments" onClick={handleClick}>
                            <MoreHorizIcon/>
                        </IconButton>
                    }
                    disableGutters
                >
                    <ListItemButton onClick={() => copySnippet("Data Science Instructor")}>
                        <Tooltip title="Directed student success by teaching 60+ students how to systematically deconstruct problems including a data analytics project using real-world datasets.">
                            <ListItemIcon>
                                <PageviewIcon />
                            </ListItemIcon>    
                        </Tooltip>
                        <ListItemText>{"Data Science Instructor"}</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
                <Link to='/edit'>
                    <MenuItem onClick={() => {
                        handleClose()
                        dispatch(setCurrentSnippet("Data Science Instructor"))
                    }}>
                        Edit
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>

            <Box>
                <Link to='/edit' onClick={() => dispatch(setNew())}>
                    <Button variant="contained">New Snippet</Button>
                </Link>
                <Link to='/login'>
                    <Button variant="text" style={{ color: '#d1c4e9' }}>
                        Logout
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}

export default Snippets;