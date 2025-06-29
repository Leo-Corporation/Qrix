import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';
import {
    BarcodeScanner20Regular,
    History20Regular,
    Home20Regular,
    QrCode20Regular,
    Settings20Regular,
} from '@fluentui/react-icons';
import Link from 'next/link';

export function AppSidebar() {
    const t = useTranslations();
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' asChild>
                            <Link href='/'>
                                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                                    <Home20Regular className='size-4' />
                                </div>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>
                                        Qrix
                                    </span>
                                    <span className='truncate text-xs'>
                                        {t('home')}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t('tools')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link href='/history'>
                                    <SidebarMenuButton>
                                        <History20Regular />
                                        {t('history')}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Link href='/barcode'>
                                    <SidebarMenuButton>
                                        <BarcodeScanner20Regular />
                                        {t('barcode')}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Link href='/qrcode'>
                                    <SidebarMenuButton>
                                        <QrCode20Regular />
                                        {t('qrcode')}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href='/settings'>
                            <SidebarMenuButton size='lg'>
                                <Settings20Regular />
                                {t('settings')}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
