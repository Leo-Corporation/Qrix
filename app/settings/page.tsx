'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowSquareUpRight20Regular,
    Settings20Regular,
} from '@fluentui/react-icons';
import { useTheme } from 'next-themes';

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

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState, useTransition } from 'react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Checkmark16Regular,
    ChevronDown16Regular,
} from '@fluentui/react-icons';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import {
    RotateOption,
    Settings,
    TextXAlign,
    TextYAlign,
    useSettings,
} from '@/hooks/use-settings';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/i18n/config';
import { Label } from '@/components/ui/label';
import { barcodeTypes } from '@/lib/barcodeTypes';
import { qrCodeTypes } from '@/lib/qrCodeTypes';
import { version } from '@/lib/version';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import clsx from 'clsx';
export default function SettingsPage() {
    const t = useTranslations();
    const { setTheme, theme } = useTheme();
    const { settings, setSettings } = useSettings();
    const [isPending, startTransition] = useTransition();

    if (settings.textsize === undefined) settings.textsize = 8;
    if (settings.textxalign === undefined) settings.textxalign = 'center';
    if (settings.textyalign === undefined) settings.textyalign = 'below';
    if (settings.qrTextsize === undefined) settings.qrTextsize = 8;
    if (settings.qrTextxalign === undefined) settings.qrTextxalign = 'center';
    if (settings.qrTextyalign === undefined) settings.qrTextyalign = 'below';
    if (settings.qrShowText === undefined) settings.qrShowText = false;
    if (settings.qrType === undefined) settings.qrType = 'qrcode';
    if (settings.qrRotation === undefined) settings.qrRotation = 'N';
    if (settings.barcodeRotation === undefined) settings.barcodeRotation = 'N';

    const [barFg, setBarFg] = useState(settings.barcodeFg);
    const [barBg, setBarBg] = useState(settings.barcodeBg);
    const [qrFg, setQrFg] = useState(settings.qrFg);
    const [qrBg, setQrBg] = useState(settings.qrBg);
    const [type, setType] = useState(settings.barcodeType);
    const [qrType, setQrType] = useState(settings.qrType);
    const [format, setFormat] = useState(settings.format);
    const [xalign, setXAlign] = useState<TextXAlign>(settings.textxalign);
    const [yalign, setYAlign] = useState<TextYAlign>(settings.textyalign);
    const [fontSize, setFontSize] = useState(settings.textsize);
    const [qrXAlign, setQrXAlign] = useState<TextXAlign>(settings.qrTextxalign);
    const [qrYAlign, setQrYAlign] = useState<TextYAlign>(settings.qrTextyalign);
    const [qrFontSize, setQrFontSize] = useState(settings.qrTextsize);
    const [qrShowText, setQrShowText] = useState(settings.qrShowText);
    const [open, setOpen] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const [barRotation, setBarRotation] = useState<RotateOption>('N');
    const [qrRotation, setQrRotation] = useState<RotateOption>('N');

    function isSettings(object: any): object is Settings {
        return (
            typeof object === 'object' &&
            typeof object.barcodeType === 'string' &&
            typeof object.barcodeBg === 'string' &&
            typeof object.barcodeFg === 'string' &&
            typeof object.qrBg === 'string' &&
            typeof object.qrFg === 'string'
        );
    }
    function Import(event: any) {
        if (!event.target) return;
        let file = event.target.files[0]; // get the selected file
        let reader = new FileReader(); // create a FileReader object
        reader.onload = function (event) {
            let text: string = event.target?.result as string; // get the file content as text
            let json: Settings = JSON.parse(text); // parse the text as JSON
            if (!isSettings(json)) {
                alert('Invalid file');
                return;
            }
            setBarFg(json.barcodeFg);
            setBarBg(json.barcodeBg);
            setQrFg(json.qrFg);
            setQrBg(json.qrBg);
            setType(json.barcodeType);
            localStorage.setItem('qrix_settings', JSON.stringify(json)); // store the JSON in localstorage
        };
        reader.readAsText(file); // read the file as text
    }

    function languageChanged(value: string) {
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
    }

    function handleFontSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = Number(event.target.value);
        setFontSize(newValue);
        settings.textsize = newValue;
        setSettings(settings);
    }

    function handleQrFontSizeChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const newValue = Number(event.target.value);
        setQrFontSize(newValue);
        settings.qrTextsize = newValue;
        setSettings(settings);
    }

    function toTextAlign(s: string): TextXAlign {
        switch (s) {
            case 'offleft':
                return 'offleft';
            case 'left':
                return 'left';
            case 'right':
                return 'right';
            case 'offright':
                return 'offright';
            case 'justify':
                return 'justify';
            default:
                return 'center';
        }
    }

    function toTextYAlign(s: string): TextYAlign {
        switch (s) {
            case 'above':
                return 'above';
            case 'below':
                return 'below';
            default:
                return 'center';
        }
    }

    function toRotation(s: string): RotateOption {
        switch (s) {
            case 'I':
                return 'I';
            case 'L':
                return 'L';
            case 'R':
                return 'R';
            default:
                return 'N';
        }
    }
    return (
        <div className='flex flex-col space-y-4 p-4 max-w-5xl mx-auto'>
            <div className='mb-2 flex items-center space-x-2'>
                <Settings20Regular
                    primaryFill='#8B2DF0'
                    className='text-white'
                />

                <p className='ml-2 font-bold'>{t('settings')}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('general')}</CardTitle>
                    <CardDescription>{t('general-desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className='font-semibold' htmlFor='theme'>
                        {t('theme')}
                    </Label>
                    <div className='flex flex-wrap'>
                        <div
                            onClick={() => setTheme('light')}
                            className={`m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-slate-100 pr-2 dark:bg-slate-700 ${
                                theme === 'light'
                                    ? 'border-accent-color'
                                    : 'border-transparent'
                            }`}
                        >
                            <Image
                                src='/LightTheme.png'
                                height={50}
                                width={50}
                                alt='Light theme image'
                                className='object-cover'
                            />
                            <p className='m-2 font-bold'>{t('light')}</p>
                        </div>
                        <div
                            onClick={() => setTheme('dark')}
                            className={`m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-slate-100 pr-2 dark:bg-slate-700 ${
                                theme === 'dark'
                                    ? 'border-accent-color'
                                    : 'border-transparent'
                            }`}
                        >
                            <Image
                                src='/DarkTheme.png'
                                height={50}
                                width={50}
                                alt='Dark theme image'
                                className='object-cover'
                            />
                            <p className='m-2 font-bold'>{t('dark')}</p>
                        </div>
                        <div
                            onClick={() => setTheme('system')}
                            className={`m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg border-2 bg-slate-100 pr-2 dark:bg-slate-700 ${
                                theme === 'system'
                                    ? 'border-accent-color'
                                    : 'border-transparent'
                            }`}
                        >
                            <Image
                                src='/SystemTheme.png'
                                height={50}
                                width={50}
                                alt='System theme image'
                                className='object-cover'
                            />
                            <p className='m-2 font-bold'>{t('system')}</p>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='language' className='font-semibold'>
                            {t('language')}
                        </Label>
                        <Select
                            defaultValue={t('lang')}
                            onValueChange={languageChanged}
                        >
                            <SelectTrigger
                                className={clsx(
                                    'h-auto w-[200px] px-2 py-1 sm:justify-self-end',
                                    isPending &&
                                        'pointer-events-none opacity-60'
                                )}
                            >
                                <SelectValue placeholder={t('language')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem defaultChecked={true} value='en'>
                                    English (United States)
                                </SelectItem>
                                <SelectItem value='fr'>
                                    Français (France)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor='language' className='font-semibold'>
                            {t('save-option')}
                        </Label>
                        <Select
                            defaultValue={format}
                            onValueChange={(
                                e: 'png' | 'jpg' | 'jpeg' | 'bmp'
                            ) => {
                                setFormat(e);
                                settings.format = e;
                                setSettings(settings);
                            }}
                        >
                            <SelectTrigger className='h-auto w-[200px] px-2 py-1 sm:justify-self-end'>
                                <SelectValue placeholder='PNG' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='bmp'>BMP</SelectItem>
                                <SelectItem value='jpg'>JPG</SelectItem>
                                <SelectItem value='jpeg'>JPEG</SelectItem>
                                <SelectItem value='png'>PNG</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('barcode')}</CardTitle>
                    <CardDescription>{t('barcode-settings')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-[auto_1fr] grid-rows-6 items-center gap-2'>
                        <p>{t('barcode-default')}</p>
                        <div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        role='combobox'
                                        aria-expanded={open}
                                        className='h-auto justify-between px-2 py-1 sm:w-[180px]'
                                    >
                                        {type
                                            ? barcodeTypes.find(
                                                  (code) => code.value === type
                                              )?.label
                                            : 'Select code...'}
                                        <ChevronDown16Regular className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-[180px] p-0'>
                                    <Command>
                                        <CommandInput
                                            placeholder={t('search-barcode')}
                                        />
                                        <CommandEmpty>
                                            {t('no-barcode-found')}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            <CommandList>
                                                <ScrollArea className='h-[190px]'>
                                                    {barcodeTypes.map(
                                                        (code) => (
                                                            <CommandItem
                                                                key={code.value}
                                                                value={
                                                                    code.value
                                                                }
                                                                onSelect={(
                                                                    currentValue
                                                                ) => {
                                                                    currentValue =
                                                                        currentValue.replace(
                                                                            '-',
                                                                            ''
                                                                        );
                                                                    switch (
                                                                        currentValue
                                                                    ) {
                                                                        case 'code25':
                                                                            currentValue =
                                                                                'code2of5';
                                                                            break;
                                                                        case 'code39 extended':
                                                                            currentValue =
                                                                                'code39ext';
                                                                            break;
                                                                        case 'code93 extended':
                                                                            currentValue =
                                                                                'code93ext';
                                                                            break;
                                                                        case 'telepen':
                                                                            currentValue =
                                                                                'telepen';
                                                                            break;
                                                                        case 'telepen numeric':
                                                                            currentValue =
                                                                                'telepennumeric';
                                                                            break;
                                                                        default:
                                                                            break;
                                                                    }
                                                                    setType(
                                                                        currentValue ===
                                                                            type
                                                                            ? ''
                                                                            : currentValue
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                    settings.barcodeType =
                                                                        currentValue;
                                                                    setSettings(
                                                                        settings
                                                                    );
                                                                }}
                                                            >
                                                                <Checkmark16Regular
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        type ===
                                                                            code.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                                {code.label}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </ScrollArea>
                                            </CommandList>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <p>{t('foreground-color')}</p>
                        <input
                            defaultValue={barFg}
                            className='colorpicker h-8 w-8 rounded-full border-0 outline-0'
                            type='color'
                            name='fg'
                            id='foreground-color'
                            onChange={(e) => {
                                settings.barcodeFg = e.target.value;
                                setSettings(settings);
                                setBarFg(e.target.value);
                            }}
                        />
                        <p>{t('background-color')}</p>
                        <input
                            defaultValue={barBg}
                            className='colorpicker h-8 w-8 rounded-full border-0 outline-0'
                            type='color'
                            name='bg'
                            id='background-color'
                            onChange={(e) => {
                                settings.barcodeBg = e.target.value;
                                setSettings(settings);
                                setBarBg(e.target.value);
                            }}
                        />
                        <p>{t('text-x-align')}</p>
                        <Select
                            defaultValue={xalign}
                            onValueChange={(e) => {
                                settings.textxalign = toTextAlign(e);
                                setSettings(settings);
                                setXAlign(toTextAlign(e));
                            }}
                        >
                            <SelectTrigger className='h-auto w-[150px] p-1'>
                                <SelectValue placeholder={t('text-x-align')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='offleft'>
                                    {t('offleft')}
                                </SelectItem>
                                <SelectItem value='left'>
                                    {t('left')}
                                </SelectItem>
                                <SelectItem value='center'>
                                    {t('center')}
                                </SelectItem>
                                <SelectItem value='right'>
                                    {t('right')}
                                </SelectItem>
                                <SelectItem value='offright'>
                                    {t('offright')}
                                </SelectItem>
                                <SelectItem value='justify'>
                                    {t('justify')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p>{t('text-y-align')}</p>
                        <Select
                            defaultValue={yalign}
                            onValueChange={(e) => {
                                settings.textyalign = toTextYAlign(e);
                                setSettings(settings);
                                setYAlign(toTextYAlign(e));
                            }}
                        >
                            <SelectTrigger className='h-auto w-[150px] p-1'>
                                <SelectValue placeholder={t('text-y-align')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='above'>
                                    {t('above')}
                                </SelectItem>
                                <SelectItem value='center'>
                                    {t('center')}
                                </SelectItem>
                                <SelectItem value='below'>
                                    {t('below')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p>{t('rotation')}</p>
                        <Select
                            defaultValue={barRotation}
                            onValueChange={(e) => {
                                settings.barcodeRotation = toRotation(e);
                                setSettings(settings);
                                setBarRotation(toRotation(e));
                            }}
                        >
                            <SelectTrigger className='h-auto w-[150px] p-1'>
                                <SelectValue placeholder={t('text-x-align')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='N'>{t('normal')}</SelectItem>
                                <SelectItem value='R'>{t('right')}</SelectItem>
                                <SelectItem value='L'>{t('left')}</SelectItem>
                                <SelectItem value='I'>
                                    {t('inverted')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p>{t('font-size')}</p>
                        <Input
                            defaultValue={fontSize}
                            onChange={handleFontSizeChange}
                            min={1}
                            max={120}
                            className='h-[28px] w-[75px] border border-input'
                            type='number'
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{t('qrcode')}</CardTitle>
                    <CardDescription>{t('qrcode-settings')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-[auto_1fr] grid-rows-6 items-center gap-2'>
                        <p>{t('barcode-default')}</p>
                        <div className='rounded-md'>
                            <Popover open={qrOpen} onOpenChange={setQrOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant='outline'
                                        role='combobox'
                                        aria-expanded={qrOpen}
                                        className='h-auto w-full justify-between border px-2 py-1 sm:w-[180px]'
                                    >
                                        {qrType
                                            ? qrCodeTypes.find(
                                                  (code) =>
                                                      code.value === qrType
                                              )?.label
                                            : 'Select code...'}
                                        <ChevronDown16Regular className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-full p-0 sm:w-[180px]'>
                                    <Command>
                                        <CommandInput
                                            placeholder={t('search-barcode')}
                                        />
                                        <CommandEmpty>
                                            {t('no-barcode-found')}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            <CommandList>
                                                <ScrollArea className='h-auto'>
                                                    {qrCodeTypes.map((code) => (
                                                        <CommandItem
                                                            key={code.value}
                                                            value={code.value}
                                                            onSelect={(
                                                                currentValue
                                                            ) => {
                                                                currentValue =
                                                                    currentValue.replace(
                                                                        '-',
                                                                        ''
                                                                    );

                                                                setQrType(
                                                                    currentValue ===
                                                                        qrType
                                                                        ? ''
                                                                        : currentValue
                                                                );
                                                                setQrOpen(
                                                                    false
                                                                );
                                                                settings.qrType =
                                                                    currentValue;
                                                                setSettings(
                                                                    settings
                                                                );
                                                            }}
                                                        >
                                                            <Checkmark16Regular
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    qrType ===
                                                                        code.value
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0'
                                                                )}
                                                            />
                                                            {code.label}
                                                        </CommandItem>
                                                    ))}
                                                </ScrollArea>
                                            </CommandList>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <p>{t('foreground-color')}</p>
                        <input
                            defaultValue={qrFg}
                            className='colorpicker h-8 w-8 rounded-full border-0 outline-0'
                            type='color'
                            name='qrfg'
                            id='qr-foreground-color'
                            onChange={(e) => {
                                settings.qrFg = e.target.value;
                                setSettings(settings);
                                setQrBg(e.target.value);
                            }}
                        />
                        <p>{t('background-color')}</p>
                        <input
                            defaultValue={qrBg}
                            className='colorpicker h-8 w-8 rounded-full border-0 outline-0'
                            type='color'
                            name='qrbg'
                            id='qr-background-color'
                            onChange={(e) => {
                                settings.qrBg = e.target.value;
                                setSettings(settings);
                                setQrFg(e.target.value);
                            }}
                        />
                        <Label htmlFor='show-text'>{t('show-text')}</Label>
                        <Switch
                            id='show-text'
                            defaultChecked={qrShowText}
                            onCheckedChange={(v) => {
                                settings.qrShowText = v;
                                setSettings(settings);
                                setQrShowText(v);
                            }}
                        ></Switch>

                        <p>{t('text-x-align')}</p>
                        <Select
                            defaultValue={qrXAlign}
                            onValueChange={(e) => {
                                settings.qrTextxalign = toTextAlign(e);
                                setSettings(settings);
                                setQrXAlign(toTextAlign(e));
                            }}
                        >
                            <SelectTrigger className='h-auto w-[150px] p-1'>
                                <SelectValue placeholder={t('text-x-align')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='offleft'>
                                    {t('offleft')}
                                </SelectItem>
                                <SelectItem value='left'>
                                    {t('left')}
                                </SelectItem>
                                <SelectItem value='center'>
                                    {t('center')}
                                </SelectItem>
                                <SelectItem value='right'>
                                    {t('right')}
                                </SelectItem>
                                <SelectItem value='offright'>
                                    {t('offright')}
                                </SelectItem>
                                <SelectItem value='justify'>
                                    {t('justify')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p>{t('text-y-align')}</p>
                        <Select
                            defaultValue={qrYAlign}
                            onValueChange={(e) => {
                                settings.qrTextyalign = toTextYAlign(e);
                                setSettings(settings);
                                setQrYAlign(toTextYAlign(e));
                            }}
                        >
                            <SelectTrigger className='h-auto w-[150px] p-1'>
                                <SelectValue placeholder={t('text-y-align')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='above'>
                                    {t('above')}
                                </SelectItem>
                                <SelectItem value='center'>
                                    {t('center')}
                                </SelectItem>
                                <SelectItem value='below'>
                                    {t('below')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p>{t('rotation')}</p>
                        <Select
                            defaultValue={qrRotation}
                            onValueChange={(e) => {
                                settings.qrRotation = toRotation(e);
                                setSettings(settings);
                                setQrRotation(toRotation(e));
                            }}
                        >
                            <SelectTrigger className='h-auto w-[150px] p-1'>
                                <SelectValue placeholder={t('text-x-align')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='N'>{t('normal')}</SelectItem>
                                <SelectItem value='R'>{t('right')}</SelectItem>
                                <SelectItem value='L'>{t('left')}</SelectItem>
                                <SelectItem value='I'>
                                    {t('inverted')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p>{t('font-size')}</p>
                        <Input
                            defaultValue={qrFontSize}
                            onChange={handleQrFontSizeChange}
                            min={1}
                            max={120}
                            className='h-[28px] w-[75px] border border-input'
                            type='number'
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('about')}</CardTitle>
                    <CardDescription>{t('about-desc')}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                        <h3 className='text-lg font-semibold'>
                            {t('version')}
                        </h3>
                        <p>Qrix v{version}</p>
                    </div>
                    <div className='space-y-2'>
                        <h3 className='text-lg font-semibold'>
                            {t('repository')}
                        </h3>
                        <a
                            href='https://github.com/Leo-Corporation/Qrix'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary flex items-center hover:underline'
                        >
                            {t('view-repository')}
                            <ArrowSquareUpRight20Regular className='ml-2 h-4 w-4' />
                        </a>
                    </div>
                    <div className='space-y-2'>
                        <h3 className='text-lg font-semibold'>
                            {t('licenses')}
                        </h3>
                        <p>
                            NextJS - MIT License - © 2025 Vercel, Inc.
                            <br></br>
                            RadixUI - MIT License - © 2022 WorkOS
                            <br></br>
                            shadcn/ui - MIT License - © 2023 shadcn
                            <br></br>
                            Fluent System Icons - MIT License - © 2020 Microsoft
                            Corporation
                            <br></br>
                            Qrix - MIT License - © 2023-
                            {new Date().getFullYear()} Léo Corporation
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{t('data')}</CardTitle>
                    <CardDescription>{t('manage-data')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex space-x-2'>
                        <Link
                            className={buttonVariants({
                                variant: 'default',
                                className: 'text-center font-bold',
                                size: 'nav',
                            })}
                            href={
                                'data:text/plain;charset=UTF-8,' +
                                encodeURIComponent(
                                    typeof window !== 'undefined'
                                        ? localStorage.getItem(
                                              'qrix_settings'
                                          ) || '{}'
                                        : '{}'
                                )
                            }
                            download={'settings.json'}
                        >
                            <span className='font-bold'>
                                {t('export-settings')}
                            </span>
                        </Link>
                        <Button
                            size='nav'
                            variant='outline'
                            className='font-bold'
                            onClick={() =>
                                (
                                    document.getElementById(
                                        'FileSelector'
                                    ) as HTMLInputElement
                                ).click()
                            }
                        >
                            {t('import-settings')}
                        </Button>
                        <Input
                            type='file'
                            id='FileSelector'
                            accept='application/json'
                            className='hidden'
                            onChange={Import}
                        ></Input>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    size='nav'
                                    className='h-auto px-2 py-1 font-bold'
                                    variant='destructive'
                                >
                                    {t('reset-settings')}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {t('reset-settings')}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t('reset-settings-msg')}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction
                                        onClick={() => {
                                            setTheme('system');
                                            localStorage.setItem(
                                                'qrix_settings',
                                                JSON.stringify({})
                                            );
                                            setBarFg('#000000');
                                            setBarBg('#FFFFFF');
                                            setQrFg('#000000');
                                            setQrBg('#FFFFFF');
                                            setType('code128');
                                            setFormat('png');
                                        }}
                                    >
                                        {t('continue')}
                                    </AlertDialogAction>
                                    <AlertDialogCancel>
                                        {t('cancel')}
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
