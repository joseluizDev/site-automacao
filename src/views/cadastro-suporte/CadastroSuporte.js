import {
   Box,
   Button,
   Grid,
   TextField, Typography,
} from "@mui/material";
import React from "react";

const CadastroSuporte = () => {
   return (
      <Box
         component="form"
         alignItems={"center"}
         sx={{
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
         }}
      >
         <Typography variant="h5" gutterBottom>
            Tutorial de Suporte
         </Typography>
         <Typography variant="body1" paragraph>
            Se você estiver enfrentando algum problema ou tiver uma dúvida, descreva
            sua situação no campo abaixo. Nossa equipe de suporte estará pronta para
            ajudar da melhor forma possível.
         </Typography>

         <TextField
            label="Descreva sua mensagem"
            multiline
            minRows={5}
            variant="outlined"
            fullWidth
            sx={{
               marginTop: "16px",
               backgroundColor: "#fff",
            }}
         />

         <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: "16px" }}

         >
            <Button
               size="large"
               onClick={() => console.log("Clicou")}
               variant="contained"
               color="primary"
            >
               Salvar
            </Button>
         </Grid>
      </Box>
   );
};

export default CadastroSuporte;