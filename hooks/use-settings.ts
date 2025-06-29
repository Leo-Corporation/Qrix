import { useLocalStorage } from './use-localStorage';

export interface Settings {
    barcodeType: string;
    barcodeFg: string;
    barcodeBg: string;
    qrFg: string;
    qrBg: string;
    format: 'png' | 'jpg' | 'jpeg' | 'bmp';
    textxalign?: TextXAlign;
    textyalign?: TextYAlign;
    textsize?: number;
    qrTextxalign?: TextXAlign;
    qrTextyalign?: TextYAlign;
    qrTextsize?: number;
    qrShowText?: boolean;
    qrType?: string;
    qrRotation?: RotateOption;
    barcodeRotation?: RotateOption;
}
export type TextXAlign =
    | 'center'
    | 'offleft'
    | 'left'
    | 'right'
    | 'offright'
    | 'justify'
    | undefined;
export type TextYAlign = 'below' | 'center' | 'above' | undefined;
export type RotateOption = 'N' | 'I' | 'R' | 'L';

export function useSettings() {
    const defaultSettings: Settings = {
        barcodeType: 'code128',
        barcodeFg: '#000000',
        barcodeBg: '#FFFFFF',
        qrFg: '#000000',
        qrBg: '#FFFFFF',
        format: 'png',
        textxalign: 'center',
        textyalign: 'below',
        textsize: 8,
        qrTextxalign: 'center',
        qrTextyalign: 'below',
        qrTextsize: 8,
        qrShowText: false,
        qrType: 'qrcode',
    };

    const [settings, setSettings] = useLocalStorage<Settings>(
        'qrix-settings',
        defaultSettings
    );

    return {
        settings,
        setSettings,
    };
}
