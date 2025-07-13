'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslations } from 'next-intl';

export function DatePicker(props: { setDate: (date: string) => void }) {
    const t = useTranslations();
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    data-empty={!date}
                    className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal'
                >
                    <CalendarIcon />
                    {date ? (
                        format(date, 'PPP')
                    ) : (
                        <span>{t('select-date')}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(d) => {
                        setDate(d);
                        props.setDate(`${formatDate(d)}`);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}

function formatDate(date: Date | undefined) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return year + month + day;
}
