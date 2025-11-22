import { Box, CircularProgress, Typography } from "@mui/material";

const FullPageLoader = () => {
    return (
        <Box
            sx={{
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <CircularProgress />
            <Typography variant="body1" color="text.secondary">
                Loading checkout...
            </Typography>
        </Box>
    );
};

export default FullPageLoader;

