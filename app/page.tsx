'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HistoryItem, useHistory } from '@/hooks/use-history';
import {
  History20Regular,
  Home20Regular,
  QrCode20Regular,
} from '@fluentui/react-icons';
import { Copy, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import bwipjs from 'bwip-js';
import { Badge } from '@/components/ui/badge';
import saveAs from 'file-saver';
import { useSettings } from '@/hooks/use-settings';
import { getLabelFromValue } from '@/lib/barcodeTypes';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { useIsMobile } from '@/hooks/use-mobile';

function RecentHistoryItem({ code, i }: { code: HistoryItem; i: number }) {
  const t = useTranslations();
  const { settings } = useSettings();
  const isMobile = useIsMobile();
  useEffect(() => {
    function genBarcode() {
      try {
        // The return value is the canvas element
        bwipjs.toCanvas(`code-${code.text}-${code.bcid}-${i}`, code);
      } catch (e) {
        // `e` may be a string or Error object
        console.error(e);
      }
    }
    genBarcode();
  }, [code, i]);
  function copyCanvasContentsToClipboard(
    canvas: HTMLCanvasElement,
    onDone: () => void,
    onError: (err: Error) => void,
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
          },
        );
      } else {
        // handle null blob case
        onError(new Error('Blob is null'));
      }
    });
  }

  function copyBtn() {
    const canvas: HTMLCanvasElement = document.getElementById(
      `code-${code.text}-${code.bcid}-${i}`,
    ) as HTMLCanvasElement;
    copyCanvasContentsToClipboard(
      canvas,
      () => {
        console.log('Copied successfully');
      },
      (err) => {
        console.error(err);
      },
    );
  }

  function getTitle() {
    if (code.metadata) {
      return t('interactive');
    }
    if (code.bcid === 'qrcode') {
      return t('qr-classic');
    } else if (code.bcid === 'swissqrcode') {
      return 'Swiss QR Code';
    } else {
      return getLabelFromValue(code.bcid);
    }
  }

  function saveBtn() {
    const canvas = document.getElementById(
      `code-${code.text}-${code.bcid}-${i}`,
    ) as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      if (blob) {
        saveAs(blob, `${code.text}.${settings.format}`);
      }
    });
  }

  return (
    <div className="hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors">
      <div className="flex items-center space-x-4">
        <canvas
          id={`code-${code.text}-${code.bcid}-${i}`}
          className="h-12 w-12"
        ></canvas>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">{getTitle()}</h3>
            {!isMobile && (
              <Badge className="text-xs">
                {code.bcid.includes('qrcode') ? t('qrcode') : t('barcode')}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground max-w-xs truncate text-sm">
            {code.text.length > (isMobile ? 18 : 50)
              ? `${code.text.slice(0, isMobile ? 18 : 50)}...`
              : code.text}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={copyBtn} variant="outline" size="sm">
          <Copy className="h-4 w-4" />
        </Button>
        <Button onClick={saveBtn} variant="outline" size="sm">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  const t = useTranslations();
  const { history, setHistory } = useHistory();
  const { settings } = useSettings();
  const codes = [...history.barCodes, ...history.qrCodes].slice(0, 6);
  const [inputText, setInputText] = useState('');
  const [codeType, setCodeType] = useState('qrcode');
  const [empty, setEmpty] = useState(true);

  function generateCode() {
    if (!inputText) return;
    const code = {
      bcid: codeType, // Barcode type
      text: inputText, // Text to encode
      scale: 3, // 3x scaling factor
      includetext: true, // Show human-readable text
      textxalign: settings.textxalign,
      textyalign: settings.textyalign,
      backgroundcolor: settings.barcodeBg,
      barcolor: settings.barcodeFg,
      textcolor: settings.barcodeFg,
      rotate: settings.barcodeRotation,
    };
    bwipjs.toCanvas('quick-code', code);

    if (codeType === 'qrcode') {
      setHistory((prev) => ({
        ...prev,
        qrCodes: [...prev.qrCodes, code],
      }));
    } else {
      setHistory((prev) => ({
        ...prev,
        barCodes: [...prev.barCodes, code],
      }));
    }
    setEmpty(false);
  }

  function saveBtn() {
    const canvas = document.getElementById(`code`) as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      if (blob) {
        saveAs(blob, `${inputText}.${settings.format}`);
      }
    });
  }

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl p-4">
        <div className="flex items-center space-x-2">
          <Home20Regular primaryFill="#8B2DF0" className="text-white" />
          <p className="ml-2 font-bold">{t('home')}</p>
        </div>
        <h2 className="mt-5 text-3xl font-bold">{t('welcome')}</h2>
      </section>
      <section className="mx-auto grid w-full max-w-7xl gap-8 p-4 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('recent-activity')}</CardTitle>
                  <CardDescription>{t('recent-desc')}</CardDescription>
                </div>
                <Link href={'/history'}>
                  <Button variant="outline" size="sm">
                    {t('see-more')}
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {codes.map((code, i) => (
                  <RecentHistoryItem i={i} key={i} code={code} />
                ))}
                {codes.length === 0 && (
                  <div className="text-muted-foreground text-center">
                    <History20Regular className="mx-auto mb-2 h-12 w-12" />
                    <p>{t('no-recent')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('quick-generator')}</CardTitle>
              <CardDescription>{t('generate-placeholder')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code-type">{t('code-type')}</Label>
                <Select value={codeType} onValueChange={setCodeType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qrcode">{t('qrcode')}</SelectItem>
                    <SelectItem value="code128">{t('barcode')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">{t('content')}</Label>
                <Input
                  id="content"
                  placeholder={t('content-placeholder')}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <Button onClick={generateCode} className="w-full">
                <QrCode20Regular className="mr-2 h-4 w-4" />
                {t('generate')}
              </Button>
            </CardContent>
          </Card>
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>{t('preview')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-muted-foreground/50 bg-accent flex aspect-square items-center justify-center rounded-lg border-2 border-dashed">
                {empty && (
                  <div className="text-center">
                    <QrCode20Regular className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
                    <p className="text-muted-foreground text-sm">
                      {t('preview-placeholder')}
                    </p>
                  </div>
                )}
                <canvas
                  id="quick-code"
                  className={clsx('h-48 w-48', { hidden: empty })}
                />
              </div>
              {!empty && (
                <div className="mt-4 space-y-2">
                  <Button
                    onClick={saveBtn}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t('download')} PNG
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
