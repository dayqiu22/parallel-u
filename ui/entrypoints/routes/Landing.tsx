import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <Box>
            <Box>
                <Link to='/'>
                    <Button variant="contained">
                        Login
                    </Button>
                </Link>
            </Box>
        </Box>
    );   
}

export default Landing;