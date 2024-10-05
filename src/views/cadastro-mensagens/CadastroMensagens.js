
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Alert,
   Box,
   Button,
   Card,
   CardContent,
   Grid,
   Snackbar,
   TextField,
   Typography
} from '@mui/material';
import React, { useState } from 'react';

const CadastroMensagens = () => {
   const [mensagemPrincipal, setMensagemPrincipal] = useState('');
   const [mensagens, setMensagens] = useState([]);
   const [novaMensagem, setNovaMensagem] = useState('');
   const [mensagemPaiId, setMensagemPaiId] = useState(null); // Armazena a ID da mensagem em que a nova mensagem será adicionada
   const [openSnackbar, setOpenSnackbar] = useState(false);
   const [mensagemSnackbar, setMensagemSnackbar] = useState('');

   // Função para adicionar a mensagem principal
   const adicionarMensagemPrincipal = () => {
      if (!mensagemPrincipal) {
         setMensagemSnackbar('Por favor, insira a mensagem principal.');
         setOpenSnackbar(true);
         return;
      }
      setMensagens([{ id: 1, texto: mensagemPrincipal, subMensagens: [] }]);
      setMensagemPrincipal('');
      setMensagemSnackbar('Mensagem principal adicionada com sucesso!');
      setOpenSnackbar(true);
   };

   // Função recursiva para adicionar uma nova sub-mensagem em qualquer nível
   const adicionarSubMensagem = (mensagens, idPai, novaMsg) => {
      return mensagens.map((mensagem) => {
         if (mensagem.id === idPai) {
            return {
               ...mensagem,
               subMensagens: [
                  ...mensagem.subMensagens,
                  { id: new Date().getTime(), texto: novaMsg, subMensagens: [] }
               ]
            };
         } else if (mensagem.subMensagens.length > 0) {
            return {
               ...mensagem,
               subMensagens: adicionarSubMensagem(mensagem.subMensagens, idPai, novaMsg)
            };
         }
         return mensagem;
      });
   };

   // Função para disparar o processo de adicionar sub-mensagem
   const handleAdicionarSubMensagem = () => {
      if (!novaMensagem || mensagemPaiId === null) {
         setMensagemSnackbar('Por favor, insira uma sub-mensagem e selecione uma mensagem pai.');
         setOpenSnackbar(true);
         return;
      }

      setMensagens(adicionarSubMensagem(mensagens, mensagemPaiId, novaMensagem));
      setNovaMensagem('');
      setMensagemPaiId(null);
      setMensagemSnackbar('Sub-mensagem adicionada com sucesso!');
      setOpenSnackbar(true);
   };

   // Função recursiva para renderizar mensagens com sub-mensagens aninhadas
   const renderizarMensagens = (mensagens) => {
      return mensagens.map((mensagem) => (
         <Accordion key={mensagem.id} sx={{ marginBottom: 2 }}>
            <AccordionSummary expandIcon="+" aria-controls="panel1a-content" id="panel1a-header">
               <Typography>{mensagem.texto}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                     {/* Exibir as sub-mensagens, se houver */}
                     {mensagem.subMensagens.length > 0 && (
                        <Box sx={{ marginLeft: 2 }}>
                           {renderizarMensagens(mensagem.subMensagens)}
                        </Box>
                     )}

                     <TextField
                        label="Nova Sub-Mensagem"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        value={mensagemPaiId === mensagem.id ? novaMensagem : ''}
                        onClick={() => setMensagemPaiId(mensagem.id)}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                     />
                     <Button
                        variant="contained"
                        sx={{ marginTop: 2 }}
                        fullWidth
                        onClick={handleAdicionarSubMensagem}
                     >
                        Adicionar Sub-Mensagem
                     </Button>
                  </CardContent>
               </Card>
            </AccordionDetails>
         </Accordion>
      ));
   };

   return (
      <Box sx={{ padding: 4 }}>
         <Typography variant="h4" gutterBottom>
            Cadastro de Mensagens Automatizadas
         </Typography>

         {!mensagens.length && (
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <TextField
                     label="Mensagem Principal"
                     fullWidth
                     value={mensagemPrincipal}
                     onChange={(e) => setMensagemPrincipal(e.target.value)}
                  />
               </Grid>
               <Grid item xs={12}>
                  <Button variant="contained" onClick={adicionarMensagemPrincipal} fullWidth>
                     Adicionar Mensagem Principal
                  </Button>
               </Grid>
            </Grid>
         )}

         {mensagens.length > 0 && (
            <Box mt={4}>
               <Typography variant="h5" gutterBottom>
                  Mensagens no Fluxo
               </Typography>
               {renderizarMensagens(mensagens)}
            </Box>
         )}

         <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
         >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
               {mensagemSnackbar}
            </Alert>
         </Snackbar>
      </Box>
   );
};

export default CadastroMensagens;
