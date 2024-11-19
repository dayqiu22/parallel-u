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
import { addSnippet, setNew, setCurrentSnippet, removeSnippet, setNotNew, clearSnippets } from "@/state/snippets/snippetsSlice";
import { RootState, persistor } from '@/state/store';
import { setDiff, unsetDiff } from '@/state/diff/diffSlice';

const Snippets = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [menuTarget, setMenuTarget] = useState<string>('');
    const snippets = useSelector((state: RootState) => state.snippets.snippets);
    const diff = useSelector((state: RootState) => state.diff.isDiff);
    
    const loadSnippets = async () => {
        try {
            const response = await fetch("http://localhost:8080/get_snippets");
            const data = await response.json();
            if (data.length > 0) {
                data.map((snippet : Snippet) => {
                    dispatch(addSnippet(snippet));
                })
            } else {
                dispatch(clearSnippets());
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (diff === true) {
            loadSnippets();
            dispatch(unsetDiff());
        }
    }, [diff]);

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

                {Object.keys(snippets).map((title: string) => {
                    return (
                        <ListItem 
                            secondaryAction={
                                <IconButton 
                                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                        handleClick(event)
                                        setMenuTarget(title)
                                    }}
                                >
                                    <MoreHorizIcon/>
                                </IconButton>
                            }
                            disableGutters
                        >
                            <ListItemButton onClick={() => copySnippet(title)}>
                                <Tooltip title={snippets[title].substring(0,101)}>
                                    <ListItemIcon>
                                        <PageviewIcon />
                                    </ListItemIcon>    
                                </Tooltip>
                                <ListItemText>{title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
                
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
                <Link to='/edit' onClick={() => {
                    dispatch(setNotNew())
                    dispatch(setCurrentSnippet(menuTarget))
                    handleClose()
                }}>
                    <MenuItem>
                        Edit
                    </MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    dispatch(removeSnippet(menuTarget))
                    dispatch(setDiff())
                    handleClose()

                    // TODO: remove snippet from db
                }}>
                    Delete
                </MenuItem>
            </Menu>

            <Box>
                <Link to='/edit' onClick={() => dispatch(setNew())}>
                    <Button variant="contained">New Snippet</Button>
                </Link>
                <Link to='/login' onClick={persistor.purge}>
                    <Button variant="text" style={{ color: '#d1c4e9' }}>
                        Logout
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}

export default Snippets;