import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'; 
import { Link, useNavigate } from "react-router-dom";

function SideNav() {
    const { collapsed } = useProSidebar();
    const theme = useTheme();

    return <Sidebar
        style={{ height: "100%", top: 'auto' }}
        breakPoint="md"
        backgroundColor={theme.palette.neutral.light}

    >
        <Box sx={styles.avatarContainer}>
            <Avatar sx={styles.avatar} alt="logo" src="/src/assets/sample-logo.png" />
            {!collapsed ? <Typography variant="overline">Vision - Mikrotik Dashboard</Typography> : null}
        </Box>

        <Menu
            menuItemStyles={{
                button: ({ level, active }) => {
                    return {
                        backgroundColor: active ? theme.palette.neutral.medium : undefined,
                    };
                },
            }}>
            <MenuItem active={window.location.pathname === "/analytics"} component={<Link to="/" />} icon={<AnalyticsOutlinedIcon />}> <Typography variant="body2">Dashboard </Typography></MenuItem>
        </Menu >
    </Sidebar >;
}

export default SideNav;

/**
 * @type {import("@mui/material").SxProps}
 */
const styles = {
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'column',
        my: 5
    },
    avatar: {
        width: '40%',
        height: 'auto'
    },
    yourChannel: {
        mt: 1
    }

}