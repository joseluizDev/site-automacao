/*************  ✨ Codeium Command 🌟  *************/
import {
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   Grid,
   IconButton,
   TextField,
   Typography
} from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

const PedidoForm = () => {
   const [categorias, setCategorias] = useState([]);
   const [categoriaAtual, setCategoriaAtual] = useState("");
   const [produtoAtual, setProdutoAtual] = useState({ nome: "", quantidade: "" });

   const handleCategoriaChange = (e) => {
      setCategoriaAtual(e.target.value);
   };

   const handleAddCategoria = () => {
      if (categoriaAtual && !categorias.some((cat) => cat.nome === categoriaAtual)) {
         setCategorias([...categorias, { nome: categoriaAtual, produtos: [] }]);
         setCategoriaAtual("");
      }
   };

   const handleProdutoChange = (e) => {
      const { name, value } = e.target;
      setProdutoAtual({ ...produtoAtual, [name]: value });
   };

   const handleAddProduto = (categoriaIndex) => {
      if (produtoAtual.nome && produtoAtual.quantidade) {
         if (produtoAtual.nome && produtoAtual.quantidade) {
            const updatedCategorias = [...categorias];
            updatedCategorias[categoriaIndex].produtos.push({ ...produtoAtual });
            setCategorias(updatedCategorias);
            setProdutoAtual({ nome: "", quantidade: "" });
         }
      };

      return (
         <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
               Categorias e Produtos
            </Typography>

            {categorias.length > 0 && (
               <Box sx={{ marginBottom: 3 }}>
                  {categorias.map((categoria, categoriaIndex) => (
                     <Card key={categoriaIndex} sx={{ marginBottom: 3, boxShadow: 3, borderRadius: 2 }}>
                        <CardHeader
                           title={
                              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                 {categoria.nome}
                              </Typography>
                           }
                           action={
                              <IconButton onClick={() => {
                                 const updatedCategorias = categorias.filter((_, index) => index !== categoriaIndex);
                                 setCategorias(updatedCategorias);
                              }}>
                                 <IconTrash size={24} />
                              </IconButton>
                           }
                        />
                        <CardContent>
                           <Grid container spacing={2} alignItems="center">
                              <Grid item xs={3}>
                                 <TextField
                                    label="Nome do Produto"
                                    name="nome"
                                    value={produtoAtual.nome}
                                    onChange={handleProdutoChange}
                                    fullWidth
                                 />
                              </Grid>

                              <Grid item xs={3}>
                                 <TextField
                                    label="Quantidade"
                                    name="quantidade"
                                    value={produtoAtual.quantidade}
                                    onChange={handleProdutoChange}
                                    fullWidth
                                 />
                              </Grid>
                              <Grid item xs={3}>
                                 <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddProduto(categoriaIndex)}
                                    fullWidth
                                 >
                                    Adicionar Pedido
                                 </Button>
                              </Grid>
                           </Grid>
                           <Box sx={{ marginTop: 2 }}>
                              {categoria.produtos.length > 0 ? (
                                 categoria.produtos.map((produto, produtoIndex) => (
                                    <Card key={produtoIndex} sx={{ marginTop: 1, padding: 1, boxShadow: 1, borderRadius: 1 }}>
                                       <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                          {produto.nome}
                                       </Typography>

                                       <Typography variant="body2">
                                          Quantidade: {produto.quantidade}
                                       </Typography>
                                    </Card>
                                 ))
                              ) : (
                                 <Typography variant="body2">Nenhum pedido adicionado</Typography>
                              )}
                           </Box>
                        </CardContent>
                     </Card>
                  ))}
               </Box>
            )}

            <Box sx={{ marginBottom: 3 }}>
               <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                     <TextField
                        label="Nome do Card"
                        value={categoriaAtual}
                        onChange={handleCategoriaChange}
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <Button variant="contained" color="primary" onClick={handleAddCategoria} fullWidth>
                        Novo Card
                     </Button>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      );
   };
}
export default PedidoForm;
