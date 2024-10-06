import {
   Avatar,
   Badge,
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   IconButton,
   Typography
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import clsx from "clsx";
import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import organization from "./org.json"; // Substitua por seu arquivo JSON atualizado

const useStyles = styled((theme) => ({
   root: {
      background: "white",
      display: "inline-block",
      borderRadius: 16,
      marginBottom: theme.spacing(2), // Adiciona espaçamento entre os cards
      padding: theme.spacing(2),
   },
   expand: {
      transform: "rotate(0deg)",
      marginTop: -10,
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
         duration: theme.transitions.duration.short,
      }),
   },
   expandOpen: {
      transform: "rotate(180deg)",
   },
   avatar: {
      backgroundColor: "#ECECF4",
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   button: {
      margin: theme.spacing(1),
   },
}));

// Componente Organization que renderiza cada nó da árvore
function Organization({ org, onCollapse, collapsed, onAddSubMessage }) {
   const classes = useStyles();
   let backgroundColor = "white";

   return (
      <Card
         variant="outlined"
         className={classes.root}
         style={{ backgroundColor }}
      >
         <CardHeader
            avatar={
               <Badge
                  style={{ cursor: "pointer" }}
                  color="secondary"
                  anchorOrigin={{
                     vertical: "bottom",
                     horizontal: "right",
                  }}
                  showZero
                  overlap="circle"
                  onClick={onCollapse}
               >
                  <Avatar className={classes.avatar}>{org.numero}</Avatar>
               </Badge>
            }
            title={
               <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6">{org.mensagem}</Typography>
               </div>
            }
         />
         <CardContent>
            <IconButton
               size="small"
               onClick={onCollapse}
               className={clsx(classes.expand, {
                  [classes.expandOpen]: !collapsed,
               })}
            >
               {org.SubMensagens ? <div>mais</div> : null}
            </IconButton>
            <Button
               variant="text"
               onClick={() => onAddSubMessage(org)}
               className={classes.button}
            >
               Adicionar Submensagem
            </Button>
         </CardContent>
      </Card>
   );
}

// Componente recursivo Node que lida com a renderização da árvore e subárvore
function Node({ o, parent, onAddSubMessage }) {
   const [collapsed, setCollapsed] = React.useState(o.collapsed);

   const handleCollapse = () => {
      setCollapsed(!collapsed);
   };

   React.useEffect(() => {
      o.collapsed = collapsed;
   }, [collapsed, o]);

   const T = parent
      ? TreeNode
      : (props) => (
         <Tree
            {...props}
            lineWidth={"2px"}
            lineColor={"#bbc"}
            lineBorderRadius={"12px"}
         >
            {props.children}
         </Tree>
      );

   const childNodes = o.SubMensagens || [];

   return (
      <T
         label={
            <Organization
               org={o}
               onCollapse={handleCollapse}
               collapsed={collapsed}
               onAddSubMessage={onAddSubMessage}
            />
         }
      >
         {!collapsed &&
            childNodes.map((child, index) => (
               <Node key={index} o={child} parent={o} onAddSubMessage={onAddSubMessage} />
            ))}
      </T>
   );
}

// Tema personalizado utilizando MUI's createTheme
const theme = createTheme({
   palette: {
      primary: {
         main: "#1976d2",
      },
      secondary: {
         main: "#dc004e",
      },
      background: {
         default: "#ECECF4",
      },
   },
   typography: {
      fontFamily: "Roboto, sans-serif",
      button: {
         textTransform: "none",
      },
   },
});

// Componente principal CadastroMensagens
export default function CadastroMensagens() {
   const [visibleNodes, setVisibleNodes] = useState([
      {
         numero: 0,
         mensagem: organization.MensagemPrincipal,
         SubMensagens: organization.Mensagens,
         collapsed: false,
      },
   ]);
   const [snackbarOpen, setSnackbarOpen] = useState(false);

   // Função para adicionar um novo nó à árvore
   const handleAddNode = () => {
      if (visibleNodes.length < organization.Mensagens.length + 1) {
         setVisibleNodes((prevNodes) => [
            ...prevNodes,
            organization.Mensagens[prevNodes.length],
         ]);
         setSnackbarOpen(true);
      }
   };

   // Função para adicionar uma submensagem ao nó
   const handleAddSubMessage = (node) => {
      const newSubMessage = {
         numero: (node.SubMensagens?.length || 0) + 1,
         mensagem: "Nova Submensagem",
      };
      node.SubMensagens = [...(node.SubMensagens || []), newSubMessage];
      setVisibleNodes([...visibleNodes]);
   };

   // Função para fechar o Snackbar
   const handleSnackbarClose = () => {
      setSnackbarOpen(false);
   };

   return (
      <ThemeProvider theme={theme}>
         <Box bgcolor="background.default" padding={4} height="80vh">
            {/* Renderiza a árvore de mensagens com a MensagemPrincipal no topo */}
            <Tree lineWidth={"2px"} lineColor={"#bbc"} lineBorderRadius={"12px"}>
               {visibleNodes.map((node, index) => (
                  <Node key={index} o={node} onAddSubMessage={handleAddSubMessage} />
               ))}
            </Tree>

            {visibleNodes.length < organization.Mensagens.length + 1 && (
               <Button variant="contained" color="primary" onClick={handleAddNode} className={useStyles().button}>
                  Adicionar Card
               </Button>
            )}


         </Box>
      </ThemeProvider>
   );
}