import React from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Box,
  Container,
  Grid
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MaterialUIExample = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Material UI Example
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Material UI Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is an example of Material UI components. The styling is automatically applied
                through the Material UI CSS system.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" startIcon={<ShoppingCartIcon />}>
                Add to Cart
              </Button>
              <Button size="small" variant="outlined" color="secondary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            bgcolor: 'primary.light', 
            p: 3, 
            borderRadius: 2,
            color: 'white',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography variant="h6" gutterBottom>
              Styled with MUI System
            </Typography>
            <Typography variant="body1">
              Material UI provides a powerful styling system called 'sx' that allows
              for direct styling of components using theme-aware properties.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MaterialUIExample;