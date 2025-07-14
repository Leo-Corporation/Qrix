'use client';
import {
    Calendar3Day20Regular,
    History20Regular,
    History48Regular,
    QrCode20Regular,
} from '@fluentui/react-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useTranslations } from 'next-intl';
import { ItemType, useHistory } from '@/hooks/use-history';
import HistoryElement from '@/components/history-card';

export default function HistoryPage() {
    const t = useTranslations();
    const { history, setHistory } = useHistory();
    const [barCodes, setBarCodes] = useState(history.barCodes);
    const [qrCodes, setQrCodes] = useState(history.qrCodes);
    const [query, setQuery] = useState('');

    function removeHistory() {
        setBarCodes([]);
        setQrCodes([]);
        setHistory({ barCodes: [], qrCodes: [] });
    }

    function deleteItem(i: number, type: ItemType) {
        // Remove the item from the history
        if (type === 'barCode') {
            setBarCodes((prev) => prev.filter((_, index) => index !== i));

            // Update the history in localStorage
            setHistory((prev) => ({
                ...prev,
                barCodes: prev.barCodes.filter((_, index) => index !== i),
            }));
        } else if (type === 'qrCode') {
            setQrCodes((prev) => prev.filter((_, index) => index !== i));

            // Update the history in localStorage
            setHistory((prev) => ({
                ...prev,
                qrCodes: prev.qrCodes.filter((_, index) => index !== i),
            }));
        }
    }
    return (
        <div className='flex flex-col space-y-4 p-4 max-w-5xl mx-auto'>
            <div className='mb-2 flex items-center space-x-2'>
                <History20Regular
                    primaryFill='#8B2DF0'
                    className='text-white'
                />

                <p className='ml-2 font-bold'>{t('history')}</p>
            </div>
            <Tabs defaultValue='barcode'>
                <div className='flex items-center justify-between'>
                    <TabsList>
                        <TabsTrigger value='barcode'>
                            <span className='grid grid-cols-[1fr_auto] gap-2 items-center'>
                                <Calendar3Day20Regular />
                                <span>{t('barcode')}</span>
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value='qrcode'>
                            <span className='grid grid-cols-[1fr_auto] gap-2 items-center'>
                                <QrCode20Regular />
                                <span>{t('qrcode')}</span>
                            </span>
                        </TabsTrigger>
                    </TabsList>
                    {(barCodes.length > 0 || qrCodes.length > 0) && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className='h-auto px-2 py-1 font-bold text-red-500 hover:text-red-600'
                                    variant='outline'
                                >
                                    {t('history-delete')}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='border-0'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {t('history')}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t('history-delete-confirm')}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction onClick={removeHistory}>
                                        {t('yes')}
                                    </AlertDialogAction>
                                    <AlertDialogCancel className='border-0'>
                                        {t('cancel')}
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
                <Input
                    onChange={(v) => setQuery(v.target.value)}
                    type='text'
                    id='prompt-txt'
                    placeholder={t('search')}
                />
                <TabsContent value='barcode'>
                    {barCodes.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('barcode')}</TableHead>
                                    <TableHead>{t('barcode-type')}</TableHead>
                                    <TableHead>{t('content')}</TableHead>
                                    <TableHead>{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {barCodes.map((item, i) => {
                                    if (!item.text.includes(query)) return;
                                    return (
                                        <HistoryElement
                                            index={i}
                                            key={item.text + i}
                                            item={item}
                                            deleteEvent={deleteItem}
                                        />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className='flex flex-col items-center py-16'>
                            <History48Regular />

                            <h2 className='text-center text-lg font-semibold'>
                                {t('history-empty')}
                            </h2>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value='qrcode'>
                    {qrCodes.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('qrcode')}</TableHead>
                                    <TableHead>{t('content')}</TableHead>
                                    <TableHead>{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {qrCodes.map((item, i) => {
                                    if (!item.text.includes(query)) return;
                                    return (
                                        <HistoryElement
                                            index={i}
                                            key={item.text + i}
                                            item={item}
                                            deleteEvent={deleteItem}
                                        />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className='flex flex-col items-center py-16'>
                            <History48Regular />

                            <h2 className='text-center text-lg font-semibold'>
                                {t('history-empty')}
                            </h2>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
