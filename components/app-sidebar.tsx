import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LinkItem } from "@/types/interface";
import { Armchair } from "lucide-react";
import Link from "next/link";

const items: LinkItem | [] = [
  {
    title: "Slot",
    url: "/dashboard",
    icon: Armchair,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              <div>
                <p className="text-2xl mx-2">BookMySlot</p>
              </div>
              {items.map((item) => (
                <SidebarMenuItem className="my-2" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
