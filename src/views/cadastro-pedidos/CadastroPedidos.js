import {
   Alert,
   Box,
   Button,
   Card,
   CardContent,
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   Snackbar,
   TextField,
   Typography
} from '@mui/material';
import React, { useState } from 'react';

const CadastroMensagens = () => {
   const [fluxo, setFluxo] = useState({
      nomeFluxo: '',
      descricao: '',
      mensagens: []
   });
   const [novaMensagem, setNovaMensagem] = useState('');
   const [openSnackbar, setOpenSnackbar] = useState(false);
   const [mensagemSnackbar, setMensagemSnackbar] = useState('');
   const [mensagemSelecionada, setMensagemSelecionada] = useState(null);

   // Função para adicionar uma nova mensagem principal ou secundária
   const adicionarMensagem = () => {
      if (!novaMensagem) {
         setMensagemSnackbar('Por favor, insira uma mensagem.');
         setOpenSnackbar(true);
         return;
      }

      const novaMsg = {
         idMensagem: fluxo.mensagens.length + 1,
         textoMensagem: novaMensagem,
         opcoesResposta: [],
         proximaMensagens: []
      };

      setFluxo({
         ...fluxo,
         mensagens: [...fluxo.mensagens, novaMsg]
      });

      setNovaMensagem('');
      setMensagemSnackbar('Mensagem adicionada com sucesso!');
      setOpenSnackbar(true);
   };

   // Função para adicionar uma resposta a uma mensagem específica
   const adicionarResposta = (idMensagem, resposta, proximaMensagem) => {
      setFluxo({
         ...fluxo,
         mensagens: fluxo.mensagens.map((msg) =>
            msg.idMensagem === idMensagem
               ? {
                  ...msg,
                  opcoesResposta: [...msg.opcoesResposta, resposta],
                  proximaMensagens: [...msg.proximaMensagens, proximaMensagem]
               }
               : msg
         )
      });

      setMensagemSnackbar('Resposta adicionada e vinculada com sucesso!');
      setOpenSnackbar(true);
   };

   return (
      <Box sx={{ padding: 4 }}>
         <Typography variant="h4" gutterBottom>
            Cadastro de Mensagens Automatizadas
         </Typography>

         <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={12} sm={6}>
               <TextField
                  label="Nome do Fluxo"
                  fullWidth
                  value={fluxo.nomeFluxo}
                  onChange={(e) => setFluxo({ ...fluxo, nomeFluxo: e.target.value })}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  label="Descrição do Fluxo"
                  fullWidth
                  value={fluxo.descricao}
                  onChange={(e) => setFluxo({ ...fluxo, descricao: e.target.value })}
               />
            </Grid>
         </Grid>

         <Grid container spacing={2}>
            <Grid item xs={12}>
               <TextField
                  label="Mensagem"
                  fullWidth
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Button variant="contained" onClick={adicionarMensagem} fullWidth>
                  Adicionar Mensagem
               </Button>
            </Grid>
         </Grid>

         <Box mt={4}>
            <Typography variant="h5" gutterBottom>
               Mensagens no Fluxo
            </Typography>
            <Grid container spacing={3}>
               {fluxo.mensagens.map((mensagem) => (
                  <Grid item xs={12} sm={6} key={mensagem.idMensagem}>
                     <Card>
                        <CardContent>
                           <Typography variant="h6">{mensagem.textoMensagem}</Typography>

                           {mensagem.opcoesResposta.map((opcao, idx) => (
                              <Typography key={idx}>
                                 {opcao} → Próxima Mensagem: {mensagem.proximaMensagens[idx]?.textoMensagem || 'Nenhuma'}
                              </Typography>
                           ))}

                           <FormControl fullWidth sx={{ mt: 2 }}>
                              <TextField
                                 label="Adicionar Resposta"
                                 value={mensagemSelecionada?.resposta || ''}
                                 onChange={(e) => setMensagemSelecionada({ ...mensagemSelecionada, resposta: e.target.value })}
                              />
                           </FormControl>

                           <FormControl fullWidth sx={{ mt: 2 }}>
                              <InputLabel>Próxima Mensagem</InputLabel>
                              <Select
                                 value={mensagemSelecionada?.proximaMensagemId || ''}
                                 onChange={(e) => setMensagemSelecionada({ ...mensagemSelecionada, proximaMensagemId: e.target.value })}
                              >
                                 {fluxo.mensagens.map((msg) => (
                                    <MenuItem key={msg.idMensagem} value={msg.idMensagem}>
                                       {msg.textoMensagem}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>

                           <Button
                              variant="contained"
                              sx={{ mt: 2 }}
                              fullWidth
                              onClick={() => {
                                 adicionarResposta(
                                    mensagem.idMensagem,
                                    mensagemSelecionada?.resposta,
                                    fluxo.mensagens.find((msg) => msg.idMensagem === mensagemSelecionada?.proximaMensagemId)
                                 );
                                 setMensagemSelecionada(null);
                              }}
                           >
                              Adicionar Resposta e Vincular
                           </Button>
                        </CardContent>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Box>

         <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
               {mensagemSnackbar}
            </Alert>
         </Snackbar>
      </Box>
   );
};

export default CadastroMensagens;
