import {Container, Grid, Typography, Button} from '@mui/material';
import PageHeader from '../Layout/header/PageHeader';


const ErrorPage = () => {
    return(
        <Container sx={{backgroundColor:'azure'}}>
            <PageHeader title='Error 404' subtitle='Page Not Found'/>

            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" color="initial">
                        Ooops... The Request URL wan not found on this server
                    </Typography>
                    <Button variant="text" color="primary">
                        CLICK HERE TO RETURN TO THE hOME PAGE...
                    </Button> 
                </Grid>
                <Grid item xs={12} md={4} justifyContent='center' alignItems='center'>
                    <img
                        width='60%'
                        src='/assets/imgs/404.jpg'
                        alt='404'
                    />
                </Grid>
            </Grid>
        </Container>

    );
};

export default ErrorPage;