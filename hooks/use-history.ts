import { useMemo } from 'react';
import { useLocalStorage } from './use-localStorage';
import { TextXAlign, TextYAlign, RotateOption } from './use-settings';
import { CalendarEvent, ContactInfo } from '@/lib/calendar';

export interface History {
    barCodes: HistoryItem[];
    qrCodes: HistoryItem[];
}

export interface HistoryItem {
    bcid: string; // Barcode type
    text: string; // Text to encode
    scale: number; // 3x scaling factor
    height?: number; // Bar height, in millimeters
    includetext: boolean; // Show human-readable text
    textxalign: TextXAlign; // Always good to set this
    textyalign?: TextYAlign;
    backgroundcolor: string;
    barcolor: string;
    textcolor: string;
    textsize?: number;
    alttext?: string;
    rotate?: RotateOption;
    metadata?: CalendarEvent | ContactInfo | object | null;
}
export function useHistory() {
    // Utiliser useMemo pour éviter de recréer l'objet à chaque rendu
    const defaultHistory = useMemo<History>(
        () => ({
            barCodes: [],
            qrCodes: [],
        }),
        []
    );

    const [history, setHistory] = useLocalStorage<History>(
        'qrix-history',
        defaultHistory
    );

    return {
        history,
        setHistory,
    };
}
