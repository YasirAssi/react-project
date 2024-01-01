import { Fragment } from "react";
import {Typography, Divider} from "@mui/material";

const PageHeader = ({title, subtitle}) => {
    return (
        <Fragment>
            <Typography variant="h1">{title}</Typography>
            <Typography variant="h2">{subtitle}</Typography>
            <Divider></Divider>
        </Fragment>
    );
};

export default PageHeader;