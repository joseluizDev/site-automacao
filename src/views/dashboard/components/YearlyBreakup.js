import { Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const ImagemCadastroWhstapp = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ padding: 0 }} elevation={9}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant={isSmallScreen ? 'h6' : 'h5'}>
          Cadastro de WhatsApp
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ mt: 1, mb: 2 }}
        >
          Cadastre seu WhatsApp para que possamos enviar notificações de novos pedidos e atualizações de status.
        </Typography>
        <img
          style={{
            width: isSmallScreen ? '80%' : '75%',
            height: 'auto',
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[3],
          }}
          src="https://static.toiimg.com/thumb/resizemode-4,msid-80875047,imgsize-60742,width-720/80875047.jpg"
          alt="A person holding a phone displaying WhatsApp logo"
        />
      </CardContent>
    </Card>
  );
};

export default ImagemCadastroWhstapp;
