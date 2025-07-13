'use client';
import {
    Checkmark16Regular,
    ChevronDown16Regular,
    Copy16Regular,
    QrCode20Regular,
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
import saveAs from 'file-saver';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { qrCodeTypes } from '@/lib/qrCodeTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DatePicker } from '@/components/ui/date-picker';
import {
    RotateOption,
    TextXAlign,
    TextYAlign,
    useSettings,
} from '@/hooks/use-settings';
import { useTranslations } from 'next-intl';
import { ContactInfo, CalendarEvent } from '@/lib/calendar';
import { useHistory } from '@/hooks/use-history';

export default function BarcodePage() {
    const t = useTranslations();
    const { settings } = useSettings();
    const { setHistory } = useHistory();
    if (settings.qrType === undefined) settings.qrType = 'qrcode';
    if (settings.qrTextsize === undefined) settings.qrTextsize = 8;
    if (settings.qrTextxalign === undefined) settings.qrTextxalign = 'center';
    if (settings.qrTextyalign === undefined) settings.qrTextyalign = 'below';
    const [content, setContent] = useState('');

    const [fg, setFg] = useState(settings.qrFg);
    const [bg, setBg] = useState(settings.qrBg);
    const [vis, setVis] = useState(false);
    const [textxalign, setTextXAlign] = useState<TextXAlign>(
        settings.qrTextxalign
    );
    const [textyalign, setTextYAlign] = useState<TextYAlign>(
        settings.qrTextyalign
    );
    const [rotation, setRotation] = useState<RotateOption>(
        settings.qrRotation ?? 'N'
    );
    const [fontSize, setFontSize] = useState(settings.qrTextsize);
    const [alt, setAlt] = useState('');
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(settings.qrType || 'qrcode');
    const [showText, setShowText] = useState(settings.qrShowText);
    const [tab, setTab] = useState('text');

    const [mail, setMail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [number, setNumber] = useState('');
    const [sms, setSms] = useState('');

    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [protocol, setProtocol] = useState('wpa');

    const [contact, setContact] = useState<ContactInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        mobile: '',
        fax: '',
        company: '',
        job: '',
        address: {
            state: '',
            street: '',
            zip: '',
            city: '',
            country: '',
        },
        website: '',
    });

    const [event, setEvent] = useState<CalendarEvent>({
        title: '',
        description: '',
        location: '',
        start: '',
        end: '',
    });
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
    function genBarcode() {
        try {
            // The return value is the canvas element
            let textContent = '';
            switch (tab) {
                case 'email':
                    textContent = `mailto:${mail}?subject=${subject.replaceAll(
                        ' ',
                        '%20'
                    )}&body=${message
                        .replaceAll(' ', '%20')
                        .replaceAll('\n', '%0A')}`;
                    break;
                case 'sms':
                    textContent = `sms:${number}?body=${sms
                        .replaceAll(' ', '%20')
                        .replaceAll('\n', '%0A')}`;
                    break;
                case 'wifi':
                    textContent = `WIFI:T:${protocol.toUpperCase()};S:${ssid};P:${password};;`;
                    break;
                case 'contact':
                    textContent = `BEGIN:VCARD\nVERSION:3.0\nN:${contact.lastName};${contact.firstName};\nFN:${contact.firstName} ${contact.lastName}\nORG:${contact.company}\nTEL;TYPE="cell,home":${contact.mobile}\nTEL;TYPE="fax,work":${contact.fax}\nTEL;TYPE="voice,home":${contact.phone}\nEMAIL:${contact.email}\nADR;TYPE=dom,home,postal,parcel:;;${contact.address.street};${contact.address.city};${contact.address.state};${contact.address.zip};${contact.address.country};\nTITLE:${contact.job}\nURL:${contact.website}\nEND:VCARD`;
                    break;
                case 'event':
                    textContent = `BEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nDTSTART:${event.start}\nDTEND:${event.end}\nEND:VEVENT`;
                    break;
                default:
                    textContent = content;
                    break;
            }

            bwipjs.toCanvas('qrcode', {
                bcid: type, // Barcode type
                text: textContent, // Text to encode
                scale: 3, // 3x scaling factor
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

            setHistory((prev) => {
                return {
                    ...prev,
                    qrCodes: [
                        ...prev.qrCodes,
                        {
                            bcid: type, // Barcode type
                            text: textContent, // Text to encode
                            scale: 3, // 3x scaling factor
                            includetext: true, // Show human-readable text
                            textxalign: 'center', // Always good to set this

                            backgroundcolor: bg.substring(1),
                            barcolor: fg.substring(1),
                            textcolor: fg.substring(1),
                            alttext: showText ? textContent : '',

                            rotate: rotation,
                            metadata: getMetadata(),
                        },
                    ],
                };
            });

            setVis(true);
        } catch (e) {
            console.error(e);
        }
    }

    function getMetadata(): ContactInfo | Event | object | null {
        switch (tab) {
            case 'email':
                return { mail: mail, subject: subject, message: message };
            case 'sms':
                return { number: number, sms: sms };
            case 'wifi':
                return { ssid: ssid, password: password, protocol: protocol };
            case 'contact':
                return {
                    firstName: contact.firstName || '',
                    lastName: contact.lastName || '',
                    email: contact.email || '',
                    phone: contact.phone || '',
                    mobile: contact.mobile || '',
                    fax: contact.fax || '',
                    company: contact.company || '',
                    job: contact.job || '',
                    address: {
                        state: contact.address?.state || '',
                        street: contact.address?.street || '',
                        zip: contact.address?.zip || '',
                        city: contact.address?.city || '',
                        country: contact.address?.country || '',
                    },
                    website: contact.website || '',
                };

            case 'event':
                return {
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    start: event.start,
                    end: event.end,
                };
            default:
                return null;
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
            'qrcode'
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
        const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
        canvas.toBlob(function (blob) {
            if (blob) {
                saveAs(blob, `${content}.${settings.format}`);
            }
        });
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
            <section className='mb-2 flex items-center space-x-2'>
                <QrCode20Regular primaryFill='#8B2DF0' className='text-white' />

                <p className='ml-2 font-bold'>{t('qrcode')}</p>
            </section>
            <section className='flex w-full flex-col items-center'>
                <div className='m-5 flex w-full space-x-2'>
                    <Tabs defaultValue='text' className='w-full'>
                        <TabsList className='my-2 w-full sm:w-fit flex h-auto flex-col space-y-2 sm:my-0 sm:flex-row sm:space-y-0'>
                            <span>
                                <TabsTrigger
                                    onClick={() => setTab('text')}
                                    value='text'
                                >
                                    {t('text')}
                                </TabsTrigger>
                                <TabsTrigger
                                    onClick={() => setTab('email')}
                                    value='email'
                                >
                                    {t('email')}
                                </TabsTrigger>
                                <TabsTrigger
                                    onClick={() => setTab('sms')}
                                    value='sms'
                                >
                                    {t('sms')}
                                </TabsTrigger>
                                <TabsTrigger
                                    onClick={() => setTab('wifi')}
                                    value='wifi'
                                >
                                    {t('wifi')}
                                </TabsTrigger>
                                <TabsTrigger
                                    onClick={() => setTab('contact')}
                                    value='contact'
                                >
                                    {t('contact')}
                                </TabsTrigger>
                                <TabsTrigger
                                    onClick={() => setTab('event')}
                                    value='event'
                                >
                                    {t('event')}
                                </TabsTrigger>
                            </span>
                            <span className='flex space-x-2'>
                                <div className='rounded-md shadow-xs'>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                role='combobox'
                                                aria-expanded={open}
                                                className='h-auto w-full justify-between border-0 bg-white px-2 py-1 sm:w-[180px]'
                                            >
                                                {type
                                                    ? qrCodeTypes.find(
                                                          (code) =>
                                                              code.value ===
                                                              type
                                                      )?.label
                                                    : 'Select code...'}
                                                <ChevronDown16Regular className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-full border-slate-200 p-0 sm:w-[180px] dark:border-slate-700'>
                                            <Command>
                                                <CommandInput
                                                    placeholder={t(
                                                        'search-barcode'
                                                    )}
                                                />
                                                <CommandEmpty>
                                                    {t('no-barcode-found')}
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className='h-auto'>
                                                        <CommandList>
                                                            {qrCodeTypes.map(
                                                                (code) => (
                                                                    <CommandItem
                                                                        key={
                                                                            code.value
                                                                        }
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
                                                                            setType(
                                                                                currentValue ===
                                                                                    type
                                                                                    ? ''
                                                                                    : currentValue
                                                                            );
                                                                            setOpen(
                                                                                false
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
                                                                        {
                                                                            code.label
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandList>
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <Button
                                    disabled={
                                        (tab === 'text' && !content) ||
                                        (tab === 'email' && !message) ||
                                        (tab === 'sms' && !sms) ||
                                        (tab === 'wifi' && !ssid) ||
                                        (tab === 'contact' &&
                                            !contact.firstName) ||
                                        (tab === 'event' &&
                                            (!event.title ||
                                                !event.start ||
                                                !event.end)) ||
                                        (tab !== 'text' &&
                                            tab !== 'email' &&
                                            tab !== 'sms' &&
                                            tab !== 'wifi' &&
                                            tab !== 'contact' &&
                                            tab !== 'event')
                                    }
                                    onClick={genBarcode}
                                    className='h-auto px-2 py-1 font-semibold'
                                >
                                    {t('create')}
                                </Button>
                            </span>
                        </TabsList>
                        <TabsContent value='text'>
                            <div className='w-full rounded-md shadow-xs'>
                                <Input
                                    onChange={handleInputChange}
                                    type='text'
                                    value={content}
                                    id='prompt-txt'
                                    placeholder={t('enter-content-qr')}
                                    className='h-auto min-w-[150px] border-0 px-2 py-1 focus:shadow-xs'
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value='email'>
                            <div className='grid grid-cols-2 gap-y-1'>
                                <p>{t('email')}</p>
                                <Input
                                    onChange={(v) => setMail(v.target.value)}
                                    type='email'
                                    value={mail}
                                    placeholder={t('email-placeholder')}
                                />
                                <p>{t('subject')}</p>
                                <Input
                                    onChange={(v) => setSubject(v.target.value)}
                                    value={subject}
                                    placeholder={t('subject')}
                                />
                                <p>{t('message')}</p>
                                <Textarea
                                    onChange={(v) => setMessage(v.target.value)}
                                    value={message}
                                    placeholder={t('message-placeholder')}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value='sms'>
                            <div className='grid grid-cols-2 gap-y-1'>
                                <p>{t('phone')}</p>
                                <Input
                                    onChange={(v) => setNumber(v.target.value)}
                                    type='tel'
                                    value={number}
                                    placeholder={t('phone-placeholder')}
                                />

                                <p>{t('message')}</p>
                                <Textarea
                                    onChange={(v) => setSms(v.target.value)}
                                    value={sms}
                                    placeholder={t('message-placeholder')}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value='wifi'>
                            <div className='grid grid-cols-2 gap-y-1'>
                                <p>{t('network-name')}</p>
                                <Input
                                    onChange={(v) => setSsid(v.target.value)}
                                    value={ssid}
                                    placeholder={t('ssid')}
                                />

                                <p>{t('password')}</p>
                                <Input
                                    onChange={(v) =>
                                        setPassword(v.target.value)
                                    }
                                    type='password'
                                    value={password}
                                    placeholder={t('password')}
                                />
                                <p>{t('encryption')}</p>
                                <RadioGroup
                                    className='flex'
                                    onValueChange={setProtocol}
                                    defaultValue='wpa'
                                >
                                    <div className='flex items-center space-x-2'>
                                        <RadioGroupItem
                                            value='none'
                                            id='none'
                                        />
                                        <Label htmlFor='none'>
                                            {t('none')}
                                        </Label>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='wpa' id='wpa' />
                                        <Label htmlFor='wpa'>{t('wpa')}</Label>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='wep' id='wep' />
                                        <Label htmlFor='wep'>{t('wep')}</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </TabsContent>
                        <TabsContent value='contact'>
                            <div className='grid grid-cols-2 gap-1 sm:grid-cols-3'>
                                <p className='hidden sm:block'>{t('name')}</p>
                                <Input
                                    name='firstname'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.firstName = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact.firstName}
                                    placeholder={t('firstname')}
                                />
                                <Input
                                    name='lastname'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.lastName = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact.lastName}
                                    placeholder={t('lastname')}
                                />
                                <p className='hidden sm:block'>{t('email')}</p>
                                <Input
                                    name='email'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.email = v.target.value;
                                        setContact(c);
                                    }}
                                    className='col-span-2'
                                    value={contact.email}
                                    placeholder={t('email')}
                                />
                                <p className='hidden sm:block'>{t('phone')}</p>
                                <Input
                                    name='mobile'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.mobile = v.target.value;
                                        setContact(c);
                                    }}
                                    type='tel'
                                    className='col-span-2'
                                    value={contact?.mobile}
                                    placeholder={t('mobile')}
                                />
                                <span className='hidden sm:block'></span>
                                <Input
                                    name='home'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.phone = v.target.value;
                                        setContact(c);
                                    }}
                                    type='tel'
                                    value={contact?.phone}
                                    placeholder={t('phone-n')}
                                />
                                <Input
                                    name='fax'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.fax = v.target.value;
                                        setContact(c);
                                    }}
                                    type='tel'
                                    value={contact?.fax}
                                    placeholder={t('fax')}
                                />
                                <p className='hidden sm:block'>
                                    {t('company')}
                                </p>
                                <Input
                                    name='company'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.company = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact?.company}
                                    placeholder={t('company')}
                                />
                                <Input
                                    name='job'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.job = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact?.job}
                                    placeholder={t('job')}
                                />
                                <p className='hidden sm:block'>{t('street')}</p>
                                <Input
                                    autoComplete='address-line1'
                                    name='street'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.address.street = v.target.value;
                                        setContact(c);
                                    }}
                                    className='col-span-2'
                                    value={contact?.address.street}
                                    placeholder={t('street')}
                                />
                                <p className='hidden sm:block'>{t('city')}</p>
                                <Input
                                    name='city'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.address.city = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact?.address.city}
                                    placeholder={t('city')}
                                />
                                <Input
                                    name='zip'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.address.zip = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact?.address.zip}
                                    placeholder={t('zip')}
                                />
                                <p className='hidden sm:block'>{t('state')}</p>
                                <Input
                                    name='state'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.address.state = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact?.address.state}
                                    placeholder={t('state')}
                                />
                                <Input
                                    name='country'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.address.country = v.target.value;
                                        setContact(c);
                                    }}
                                    value={contact?.address.country}
                                    placeholder={t('country')}
                                />
                                <p className='hidden sm:block'>
                                    {t('website')}
                                </p>
                                <Input
                                    name='website'
                                    onChange={(v) => {
                                        const c = Object.create(contact);
                                        c.website = v.target.value;
                                        setContact(c);
                                    }}
                                    className='col-span-2'
                                    value={contact?.website}
                                    placeholder={t('website')}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value='event'>
                            <div className='grid grid-cols-2 gap-y-1'>
                                <p>{t('event-title')}</p>
                                <Input
                                    onChange={(v) => {
                                        const e = Object.create(event);
                                        e.title = v.target.value;
                                        setEvent(e);
                                    }}
                                    value={event.title}
                                    placeholder={t('event')}
                                />

                                <p>{t('description')}</p>
                                <Textarea
                                    onChange={(v) => {
                                        const e = Object.create(event);
                                        e.description = v.target.value;
                                        setEvent(e);
                                    }}
                                    value={event.description}
                                    placeholder={t('description')}
                                />
                                <p>{t('location')}</p>
                                <Input
                                    onChange={(v) => {
                                        const e = Object.create(event);
                                        e.location = v.target.value;
                                        setEvent(e);
                                    }}
                                    value={event.location}
                                    placeholder={t('location')}
                                />
                                <p>{t('start-date')}</p>
                                <DatePicker
                                    setDate={(date: string) => {
                                        const e = Object.create(event);
                                        e.start = date;
                                        setEvent(e);
                                    }}
                                />
                                <p>{t('end-date')}</p>
                                <DatePicker
                                    setDate={(date: string) => {
                                        const e = Object.create(event);
                                        e.end = date;
                                        setEvent(e);
                                    }}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {vis ? <></> : <p>{t('qr-placeholder')}</p>}
                <canvas
                    className={vis ? 'max-w-full' : 'hidden'}
                    id='qrcode'
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
                        defaultValue={fg}
                        className='colorpicker h-full w-[150px] rounded-md border-2 outline-0'
                        type='color'
                        name='fg'
                        id='foreground-color'
                        onChange={(e) => setFg(e.target.value)}
                    />
                    <p className='font-semibold'>{t('background-color')}</p>
                    <input
                        defaultValue={bg}
                        className='colorpicker h-full w-[150px] rounded-md border-2 outline-0'
                        type='color'
                        name='bg'
                        id='background-color'
                        onChange={(e) => setBg(e.target.value)}
                    />
                    <Label className='font-semibold' htmlFor='show-text'>
                        {t('show-text')}
                    </Label>
                    <Switch
                        id='show-text'
                        defaultChecked={showText}
                        onCheckedChange={(v) => setShowText(v)}
                    ></Switch>
                </section>
                <section className='grid grid-rows-6 items-center gap-2'>
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
                </section>
                <section className='grid grid-rows-6 items-center gap-2'>
                    <p className='font-semibold'>{t('font-size')}</p>
                    <div className='w-[150px] rounded-md shadow-xs'>
                        <Input
                            onChange={handleFontSizeChange}
                            min={1}
                            max={120}
                            defaultValue={fontSize}
                            className='border-0 p-2'
                            type='number'
                        />
                    </div>
                    <p className='font-semibold'>{t('alt-text')}</p>
                    <div className='w-[150px] rounded-md shadow-xs'>
                        <Input
                            onChange={handleAltChange}
                            type='text'
                            placeholder={t('alt-text')}
                            className='w-[150px] border-0 px-2 py-1'
                        />
                    </div>
                </section>
            </section>
        </div>
    );
}
