import {
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   IconButton,
   TextField,
   Typography
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { v4 as uuidv4 } from "uuid";

const useStyles = styled((theme) => ({
   root: {
      background: "white",
      display: "inline-block",
      borderRadius: 16,
      marginBottom: theme.spacing(2),
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
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   button: {
      margin: theme.spacing(1),
   },
}));

function Organization({ org, onCollapse, collapsed, onAddSubMessage, onDelete, onUpdateMessage }) {
   const classes = useStyles();
   const [localMessage, setLocalMessage] = useState(org.mensagem);

   const handleDelete = () => {
      onDelete(org);
   };

   const handleChangeMessage = (event) => {
      setLocalMessage(event.target.value);
   };

   const handleBlur = () => {
      onUpdateMessage(org.key, localMessage);
   };

   return (
      <Card
         variant="outlined"
         className={classes.root}
         style={{ backgroundColor: "white" }}
      >
         <CardHeader
            title={
               <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6">{localMessage}</Typography>
               </div>
            }
         />
         <CardContent>
            <Typography variant="body2" color="textSecondary">
               Este é um card que representa uma mensagem ou submensagem na árvore.
            </Typography>
            <TextField
               label="Editar Mensagem"
               variant="outlined"
               fullWidth
               margin="normal"
               value={localMessage}
               onChange={handleChangeMessage}
               onBlur={handleBlur}
            />
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
            <Button
               variant="text"
               color="secondary"
               onClick={handleDelete}
               className={classes.button}
            >
               Excluir
            </Button>
         </CardContent>
      </Card>
   );
}

function Node({ o, parent, onAddSubMessage, onDeleteNode, onUpdateMessage }) {
   const [collapsed, setCollapsed] = useState(o.collapsed);

   const handleCollapse = () => {
      setCollapsed(!collapsed);
   };

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

   const handleDelete = () => {
      parent.SubMensagens = parent.SubMensagens.filter(sub => sub.key !== o.key);
      onDeleteNode();
   };

   const childNodes = o.SubMensagens || [];

   return (
      <T
         label={
            <Organization
               org={o}
               onCollapse={handleCollapse}
               collapsed={collapsed}
               onAddSubMessage={onAddSubMessage}
               onDelete={handleDelete}
               onUpdateMessage={onUpdateMessage}
            />
         }
      >
         {!collapsed &&
            childNodes.map((child) => (
               <Node key={child.key} o={child} parent={o} onAddSubMessage={onAddSubMessage} onDeleteNode={onDeleteNode} onUpdateMessage={onUpdateMessage} />
            ))}
      </T>
   );
}

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

export default function CadastroMensagens() {
   const [visibleNodes, setVisibleNodes] = useState([
      {
         key: uuidv4(),
         numero: 0,
         mensagem: "Mensagem principal",
         SubMensagens: [
            { key: uuidv4(), numero: 1, mensagem: "Submensagem 1", SubMensagens: [] },
            { key: uuidv4(), numero: 2, mensagem: "Submensagem 2", SubMensagens: [] },
         ],
         collapsed: false,
      },
   ]);

   const handleAddSubMessage = useCallback((node) => {
      const newSubMessage = {
         key: uuidv4(),
         numero: (node.SubMensagens?.length || 0) + 1,
         mensagem: "Nova Submensagem",
         SubMensagens: [],
      };
      node.SubMensagens = [...(node.SubMensagens || []), newSubMessage];
      setVisibleNodes((prevNodes) => [...prevNodes]);
   }, [setVisibleNodes]);

   const handleDeleteNode = useCallback(() => {
      setVisibleNodes((prevNodes) => [...prevNodes]);
   }, [setVisibleNodes]);

   const handleUpdateMessage = useCallback((key, newMessage) => {
      const updateNodeMessage = (nodes) => {
         return nodes.map(node => {
            if (node.key === key) {
               return {
                  ...node,
                  mensagem: newMessage,
               };
            }
            return {
               ...node,
               SubMensagens: node.SubMensagens ? updateNodeMessage(node.SubMensagens) : [],
            };
         });
      };

      setVisibleNodes((prevNodes) => updateNodeMessage(prevNodes));
   }, [setVisibleNodes]);

   return (
      <ThemeProvider theme={theme}>
         <Box padding={4} height="80vh">
            <Tree lineWidth={"2px"} lineColor={"#bbc"} lineBorderRadius={"12px"}>
               {visibleNodes.map((node) => (
                  <Node key={node.key} o={node} onAddSubMessage={handleAddSubMessage} onDeleteNode={handleDeleteNode} onUpdateMessage={handleUpdateMessage} />
               ))}
            </Tree>
         </Box>
      </ThemeProvider>
   );
}
