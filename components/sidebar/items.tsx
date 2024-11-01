import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link"; 

interface SidebarItemProps {
    items: {
        title: string;
        url: string;
        icon: React.FC; 
    }[];
}

export default function SidebarItem({ items }: SidebarItemProps) {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link href={item.url}>
                            <>
                                <item.icon />
                                <span>{item.title}</span>
                            </>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}