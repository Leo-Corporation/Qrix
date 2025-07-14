'use client';
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
import { usePathname } from 'next/navigation';

export function AppSidebar() {
    const t = useTranslations();
    // Get the current page
    const currentPage = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className={currentPage === '/' ? 'bg-accent' : ''}
                            size='lg'
                            asChild
                        >
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
                                    <SidebarMenuButton
                                        className={
                                            currentPage === '/history'
                                                ? 'bg-accent'
                                                : ''
                                        }
                                    >
                                        <History20Regular />
                                        {t('history')}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Link href='/barcode'>
                                    <SidebarMenuButton
                                        className={
                                            currentPage === '/barcode'
                                                ? 'bg-accent'
                                                : ''
                                        }
                                    >
                                        <BarcodeScanner20Regular />
                                        {t('barcode')}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Link href='/qrcode'>
                                    <SidebarMenuButton
                                        className={
                                            currentPage === '/qrcode'
                                                ? 'bg-accent'
                                                : ''
                                        }
                                    >
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
                            <SidebarMenuButton
                                className={
                                    currentPage === '/settings'
                                        ? 'bg-accent'
                                        : ''
                                }
                                size='lg'
                            >
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
