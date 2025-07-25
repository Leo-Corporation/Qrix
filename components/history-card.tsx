import bwipjs from 'bwip-js';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  Copy16Regular,
  Delete16Regular,
  Save16Regular,
} from '@fluentui/react-icons';
import saveAs from 'file-saver';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { getLabelFromValue } from '@/lib/barcodeTypes';
import { ScrollArea } from './ui/scroll-area';
import { TableCell, TableRow } from './ui/table';
import { Close } from '@radix-ui/react-dialog';
import { HistoryItem, ItemType } from '@/hooks/use-history';
import { useTranslations } from 'next-intl';
import { useSettings } from '@/hooks/use-settings';
import { useIsMobile } from '@/hooks/use-mobile';

export default function HistoryElement(props: {
  item: HistoryItem;
  index: number;
  deleteEvent: (i: number, type: ItemType) => void;
  home?: boolean;
}) {
  const t = useTranslations();
  const { settings } = useSettings();
  const isMobile = useIsMobile();
  const [url, setURL] = useState('');

  useEffect(() => {
    function genBarcode() {
      try {
        // The return value is the canvas element
        const canvas = bwipjs.toCanvas(
          `code-${props.item.text}-${props.index}`,
          props.item,
        );
        setURL(canvas.toDataURL());
      } catch (e) {
        // `e` may be a string or Error object
        console.error(e);
      }
    }
    genBarcode();
  }, [props.item, props.index]);
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
      `code-${props.item.text}-${props.index}`,
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
  function saveBtn() {
    const canvas = document.getElementById(
      `code-${props.item.text}-${props.index}`,
    ) as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      if (blob) {
        saveAs(blob, `${props.item.text}.${settings.format}`);
      }
    });
  }

  function isQrCode(bcid: string): boolean {
    switch (bcid) {
      case 'qrcode':
        return true;
      case 'swissqrcode':
        return true;
      default:
        return false;
    }
  }

  function deleteBtn() {
    props.deleteEvent(
      props.index,
      isQrCode(props.item.bcid) ? 'qrCode' : 'barCode',
    );
  }

  const keys = props.item.metadata ? Object.keys(props.item.metadata) : [];
  const vals = props.item.metadata ? Object.values(props.item.metadata) : [];
  return (
    <TableRow>
      <canvas
        className="hidden"
        id={`code-${props.item.text}-${props.index}`}
      ></canvas>
      <TableCell
        className={`${isQrCode(props.item.bcid) ? 'h-[150px]' : 'h-[65px]'}`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {isMobile ? (
                <Drawer>
                  <DrawerTrigger>
                    <Image
                      width={150}
                      height={150}
                      className={`max-w-[150px] object-contain ${
                        isQrCode(props.item.bcid) ? '' : 'h-[65px]'
                      }`}
                      src={url}
                      alt={props.item.text}
                    />
                  </DrawerTrigger>
                  <DrawerContent className="bg-white dark:bg-slate-900">
                    <DrawerHeader>
                      <DrawerTitle>
                        {t('preview')} -{' '}
                        {props.item.metadata
                          ? t('interactive')
                          : props.item.text}
                      </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex justify-center">
                      <Image
                        width={300}
                        height={300}
                        src={url}
                        alt={props.item.text}
                      />
                    </div>
                    <ScrollArea className="max-h-[250px] overflow-y-scroll p-4">
                      {keys.map((key, i) => (
                        <span key={i} className="my-2">
                          <h3 className="font-bold" key={i}>
                            {t(key === 'title' ? 'event-title' : key)}
                          </h3>
                          {typeof vals[i] === 'object' ? (
                            <div className="rounded-md border border-slate-200 p-2 text-sm dark:border-slate-800">
                              {Object.keys(vals[i]).map((k, j) => (
                                <span key={j}>
                                  <h3 className="font-bold">{t(k)}</h3>
                                  <p>{Object.values(vals[i])[j] as string}</p>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p>{vals[i]}</p>
                          )}
                        </span>
                      ))}
                    </ScrollArea>
                    <DrawerFooter>
                      <div className="flex justify-center space-x-2">
                        <Button onClick={copyBtn} className="h-auto p-1 px-2">
                          {t('copy')}
                        </Button>
                        <Button
                          onClick={saveBtn}
                          className="h-auto p-1 px-2"
                          variant="outline"
                        >
                          {t('save')}
                        </Button>
                        {!props.home && (
                          <Close>
                            <Button
                              onClick={deleteBtn}
                              variant="outline"
                              className="h-8 px-2 py-1"
                            >
                              <Delete16Regular />
                            </Button>
                          </Close>
                        )}
                      </div>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              ) : (
                <Dialog>
                  <DialogTrigger disabled={props.home}>
                    <Image
                      width={150}
                      height={isQrCode(props.item.bcid) ? 150 : 65}
                      className={`max-w-[150px] object-contain ${
                        isQrCode(props.item.bcid) ? '' : 'h-[65px]'
                      }`}
                      src={url}
                      alt={props.item.text}
                    />
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-slate-900">
                    <DialogHeader>
                      <DialogTitle>
                        {t('preview')} -{' '}
                        {props.item.metadata
                          ? t('interactive')
                          : props.item.text}
                      </DialogTitle>
                    </DialogHeader>
                    {props.item.metadata !== null &&
                    props.item.metadata !== undefined ? (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-center">
                          <Image
                            width={300}
                            height={300}
                            src={url}
                            alt={props.item.text}
                          />
                        </div>
                        <ScrollArea className="max-h-[250px]">
                          {keys.map((key, i) => (
                            <span key={i} className="my-2">
                              <h3 className="font-bold" key={i}>
                                {t(key === 'title' ? 'event-title' : key)}
                              </h3>
                              {typeof vals[i] === 'object' ? (
                                <div className="rounded-md border border-slate-200 p-2 text-sm dark:border-slate-800">
                                  {Object.keys(vals[i]).map((k, j) => (
                                    <span key={j}>
                                      <h3 className="font-bold">{t(k)}</h3>
                                      <p>
                                        {Object.values(vals[i])[j] as string}
                                      </p>
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p>{vals[i]}</p>
                              )}
                            </span>
                          ))}
                        </ScrollArea>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <Image
                          width={300}
                          height={300}
                          src={url}
                          alt={props.item.text}
                        />
                      </div>
                    )}
                    <div className="flex justify-center space-x-2">
                      <Button onClick={copyBtn} className="h-auto p-1 px-2">
                        {t('copy')}
                      </Button>
                      <Button
                        onClick={saveBtn}
                        className="h-auto p-1 px-2"
                        variant="outline"
                      >
                        {t('save')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{props.item.text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      {isQrCode(props.item.bcid) ? (
        <></>
      ) : (
        <TableCell>{getLabelFromValue(props.item.bcid)}</TableCell>
      )}

      <TableCell>
        <p className="mt-2 text-wrap">
          {props.item.metadata
            ? t('interactive')
            : props.item.text.length > 30
              ? props.item.text.substring(0, 27) + '...'
              : props.item.text}
        </p>
      </TableCell>
      {!props.home && (
        <TableCell>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={copyBtn}
                    variant="outline"
                    className="h-auto px-2 py-1"
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
                    variant="outline"
                    className="h-auto px-2 py-1"
                  >
                    <Save16Regular />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('save')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={deleteBtn}
                    variant="outline"
                    className="h-auto px-2 py-1"
                  >
                    <Delete16Regular />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('delete')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}
