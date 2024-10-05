import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';

const products = [
    {
        name: "Sunil Joshi",
        telefone: "+00 123 456 0000",
        post: "Web Designer",
        pname: "Elite Admin",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        name: "Andrew McDownland",
        telefone: "+00 123 456 0000",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        name: "Christopher Jamil",
        telefone: "+00 123 456 0000",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        name: "Nirav Joshi",
        telefone: "+00 123 456 0000",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        pbg: "success.main",
        budget: "2.4",

    },
];


const TopClientesFrequentes = () => {
    return (
        <DashboardCard title="Vendas frequentes" subtitle="Lista de pessoas que mais compram">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>

                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Endereço
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Nome
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Telefone
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Valor
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.sort((a, b) => parseFloat(b.budget) - parseFloat(a.budget)).slice(0, 5)
                            .map((product) => (
                                <TableRow key={product.name}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {product.name}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    {product.post}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {product.pname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                            {product.telefone}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Typography variant="h6">${product.budget}k</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default TopClientesFrequentes;
