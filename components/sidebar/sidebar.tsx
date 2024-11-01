import { Calendar, Home, LayoutDashboard, Box, MessageCircle } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import SidebarItem from "./items"
import Image from 'next/image'

// Menu items com sub menus.

interface Item {
    title: string;
    url: string;
    icon: React.FC;
}

interface Items {
    Inicio: Item[];
    Cadastros: Item[];
    Extras: Item[];
}

const items: Items = {
    "Inicio": [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboard,
        },
    ],
    "Cadastros": [
        {
            title: "Pedidos",
            url: "/admin/pedidos",
            icon: Box,
        },
        {
            title: "Mensagens",
            url: "/admin/mensagem",
            icon: MessageCircle,
        },
    ],
    "Extras": [
        {
            title: "Visualizar Agenda",
            url: "/admin/agenda",
            icon: Calendar,
        },
    ],

}

export function AppSidebar() {
    return (
        <Sidebar className="bg-black">
            <SidebarHeader className="flex items-center">
                <Image src="/img/logoWpp.svg" alt="Logo" width={100} height={100} /> 
            </SidebarHeader>
            <SidebarContent>
                {Object.keys(items).map((group) => (
                    <SidebarGroup key={group}>
                        <SidebarGroupLabel>{group}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarItem items={items[group as keyof Items]} />
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>Sair</SidebarFooter>
        </Sidebar>
    );
}
