import { Grid, Typography } from "@mui/material";

const NotAuthorized = () => (
    <Grid sx={{ minHeight: "80vh", placeContent: "center" }}>
        <Typography variant="h4" align="center">
            Oops! You're not authorized to access this page.
        </Typography>
    </Grid>
);

export default NotAuthorized