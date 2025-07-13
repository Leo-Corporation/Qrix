'use client';
import {
    Calendar3Day20Regular,
    Copy16Regular,
    DismissCircle16Filled,
    Save16Regular,
    Settings20Regular,
} from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import bwipjs from 'bwip-js';
import { SetStateAction, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import * as React from 'react';
import saveAs from 'file-saver';
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
import { useTranslations } from 'next-intl';
import {
    RotateOption,
    TextXAlign,
    TextYAlign,
    useSettings,
} from '@/hooks/use-settings';
import { barcodeTypes } from '@/lib/barcodeTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useHistory } from '@/hooks/use-history';
export default function BarcodePage() {
    const t = useTranslations();
    const { settings } = useSettings();
    const { setHistory } = useHistory();
    if (settings.textsize === undefined) settings.textsize = 8;
    if (settings.textxalign === undefined) settings.textxalign = 'center';
    if (settings.textyalign === undefined) settings.textyalign = 'below';

    const [content, setContent] = useState('');
    const [alt, setAlt] = useState('');
    const [type, setType] = useState(settings.barcodeType);
    const [fg, setFg] = useState(settings.barcodeFg);
    const [bg, setBg] = useState(settings.barcodeBg);
    const [textxalign, setTextXAlign] = useState<TextXAlign>(
        settings.textxalign
    );
    const [textyalign, setTextYAlign] = useState<TextYAlign>(
        settings.textyalign
    );
    const [rotation, setRotation] = useState<RotateOption>(
        settings.barcodeRotation ?? 'N'
    );
    const [fontSize, setFontSize] = useState(settings.textsize);
    const [open, setOpen] = useState(false);
    const [vis, setVis] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [errOccured, setErrOccured] = useState(false);
    const handleInputChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setContent(event.target.value);
    };
    const handleAltChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setAlt(event.target.value);
    };
    const handleFontSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue = Number(event.target.value);
        setFontSize(newValue);
    };

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

    function genBarcode() {
        try {
            // The return value is the canvas element
            setErrOccured(false);
            bwipjs.toCanvas('barcode', {
                bcid: type, // Barcode type
                text: content, // Text to encode
                scale: 3, // 3x scaling factor
                height: 10, // Bar height, in millimeters
                includetext: true, // Show human-readable text
                textxalign: textxalign, // Always good to set this
                textyalign: textyalign,
                backgroundcolor: bg.substring(1),
                barcolor: fg.substring(1),
                textcolor: fg.substring(1),
                textsize: fontSize,
                alttext: alt,
                rotate: rotation,
            });
            setHistory((prev) => ({
                ...prev,
                barCodes: [
                    ...prev.barCodes,
                    {
                        bcid: type, // Barcode type
                        text: content, // Text to encode
                        scale: 3, // 3x scaling factor
                        height: 10, // Bar height, in millimeters
                        includetext: true, // Show human-readable text
                        textxalign: textxalign, // Always good to set this
                        textyalign: textyalign,
                        backgroundcolor: bg.substring(1),
                        barcolor: fg.substring(1),
                        textcolor: fg.substring(1),
                        textsize: fontSize,
                        alttext: alt,
                        rotate: rotation,
                    },
                ],
            }));
            setVis(true);
        } catch (e: unknown) {
            // `e` may be a string or Error object
            console.error(e);
            setErrOccured(true);
            setErrMsg((e as Error).message);
        }
    }

    function copyCanvasContentsToClipboard(
        canvas: HTMLCanvasElement,
        onDone: () => void,
        onError: (err: Error) => void
    ) {
        canvas.toBlob((blob) => {
            // check for null blob
            if (blob) {
                const data = [new ClipboardItem({ [blob.type]: blob })];
                navigator.clipboard.write(data).then(
                    () => {
                        onDone();
                    },
                    (err) => {
                        onError(err);
                    }
                );
            } else {
                // handle null blob case
                onError(new Error('Blob is null'));
            }
        });
    }
    function copyBtn() {
        const canvas: HTMLCanvasElement = document.getElementById(
            'barcode'
        ) as HTMLCanvasElement;
        copyCanvasContentsToClipboard(
            canvas,
            () => {
                console.log('Copied successfully');
            },
            (err) => {
                console.error(err);
            }
        );
    }
    function saveBtn() {
        const canvas = document.getElementById('barcode') as HTMLCanvasElement;
        canvas.toBlob(function (blob) {
            if (blob) {
                saveAs(blob, `${content}.${settings.format}`);
            }
        });
    }
    return (
        <div className='flex flex-col space-y-4 p-4 max-w-5xl mx-auto'>
            <section className='mb-2 flex items-center space-x-2'>
                <Calendar3Day20Regular
                    primaryFill='#8B2DF0'
                    className='text-white'
                />

                <p className='ml-2 font-bold'>{t('barcode')}</p>
            </section>
            <section className='flex w-full flex-col items-center'>
                <div className='m-5 flex w-full flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2'>
                    <div className='w-full rounded-md shadow-xs'>
                        <Input
                            onChange={handleInputChange}
                            type='text'
                            id='prompt-txt'
                            placeholder={t('enter-content')}
                            className='h-auto min-w-[150px] border-0 px-2 py-1 '
                        />
                    </div>
                    <div className='rounded-md shadow-xs'>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant='outline'
                                    role='combobox'
                                    aria-expanded={open}
                                    className='h-auto w-full justify-between border-0 px-2 py-1 sm:w-[180px] '
                                >
                                    {type
                                        ? barcodeTypes.find(
                                              (code) => code.value === type
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
                                            <ScrollArea className='h-[190px]'>
                                                {barcodeTypes.map((code) => (
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
                                                            setOpen(false);
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
                                                ))}
                                            </ScrollArea>
                                        </CommandList>
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button
                        onClick={genBarcode}
                        disabled={!content}
                        className='h-auto px-2 py-1 font-semibold'
                    >
                        {t('create')}
                    </Button>
                </div>
                {errOccured ? (
                    <div className='flex w-full items-center space-x-2'>
                        <DismissCircle16Filled color='red' />
                        <p>{errMsg}</p>
                    </div>
                ) : (
                    <></>
                )}
                {vis ? <></> : <p>{t('barcode-placeholder')}</p>}
                <canvas
                    className={vis ? 'max-w-full' : 'hidden'}
                    id='barcode'
                ></canvas>
                <div className={vis ? 'm-4 flex space-x-2' : 'hidden'}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    onClick={copyBtn}
                                    variant='outline'
                                    className='h-auto px-2 py-1'
                                >
                                    <Copy16Regular />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('copy')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    onClick={saveBtn}
                                    variant='outline'
                                    className='h-auto px-2 py-1'
                                >
                                    <Save16Regular />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('save')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </section>
            <section className='mb-2 flex items-center space-x-2'>
                <Settings20Regular
                    primaryFill='#8B2DF0'
                    className='text-white'
                />

                <p className='ml-2 font-bold'>{t('options')}</p>
            </section>

            <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                <section className='grid grid-rows-6 items-center gap-2'>
                    <p className='font-semibold'>{t('foreground-color')}</p>
                    <input
                        defaultValue={settings.barcodeFg}
                        className='colorpicker border-accent-color w-[150px] h-full rounded-md border-2 outline-0'
                        type='color'
                        name='fg'
                        id='foreground-color'
                        onChange={(e) => setFg(e.target.value)}
                    />
                    <p className='font-semibold'>{t('background-color')}</p>
                    <input
                        defaultValue={settings.barcodeBg}
                        className='colorpicker border-accent-color w-[150px] h-full rounded-md border-2 outline-0'
                        type='color'
                        name='bg'
                        id='background-color'
                        onChange={(e) => setBg(e.target.value)}
                    />
                    <p className='font-semibold'>{t('text-x-align')}</p>
                    <Select
                        defaultValue={textxalign}
                        onValueChange={(e) => {
                            setTextXAlign(toTextAlign(e));
                        }}
                    >
                        <SelectTrigger className='h-auto w-[150px] p-1'>
                            <SelectValue placeholder={t('text-x-align')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='offleft'>
                                {t('offleft')}
                            </SelectItem>
                            <SelectItem value='left'>{t('left')}</SelectItem>
                            <SelectItem value='center'>
                                {t('center')}
                            </SelectItem>
                            <SelectItem value='right'>{t('right')}</SelectItem>
                            <SelectItem value='offright'>
                                {t('offright')}
                            </SelectItem>
                            <SelectItem value='justify'>
                                {t('justify')}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </section>
                <section className='grid grid-rows-6 items-center gap-2'>
                    <p className='font-semibold'>{t('text-y-align')}</p>
                    <Select
                        defaultValue={textyalign}
                        onValueChange={(e) => {
                            setTextYAlign(toTextYAlign(e));
                        }}
                    >
                        <SelectTrigger className='h-auto w-[150px] p-1'>
                            <SelectValue placeholder={t('text-y-align')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='above'>{t('above')}</SelectItem>
                            <SelectItem value='center'>
                                {t('center')}
                            </SelectItem>
                            <SelectItem value='below'>{t('below')}</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className='font-semibold'>{t('rotation')}</p>
                    <Select
                        defaultValue={rotation}
                        onValueChange={(e) => {
                            setRotation(toRotation(e));
                        }}
                    >
                        <SelectTrigger className='h-auto w-[150px] p-1'>
                            <SelectValue placeholder={t('text-x-align')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='N'>{t('normal')}</SelectItem>
                            <SelectItem value='R'>{t('right')}</SelectItem>
                            <SelectItem value='L'>{t('left')}</SelectItem>
                            <SelectItem value='I'>{t('inverted')}</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className='font-semibold'>{t('font-size')}</p>
                    <div className='w-[150px] rounded-md shadow-xs '>
                        <Input
                            onChange={handleFontSizeChange}
                            min={1}
                            max={120}
                            defaultValue={fontSize}
                            className='border-0 p-2'
                            type='number'
                        />
                    </div>
                </section>
                <section className='grid grid-rows-6 items-center gap-2'>
                    <p className='font-semibold'>{t('alt-text')}</p>
                    <div className='w-[150px] rounded-md shadow-xs'>
                        <Input
                            onChange={handleAltChange}
                            type='text'
                            placeholder={t('alt-text')}
                            className='w-[150px] border-0  px-2 py-1 '
                        />
                    </div>
                </section>
            </section>
        </div>
    );
}
