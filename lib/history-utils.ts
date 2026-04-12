import { HistoryItem } from '@/hooks/use-history';

const legacyKeyMap = new WeakMap<object, string>();

export function createHistoryItemId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `legacy-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getHistoryItemKey(item: HistoryItem): string {
  if (item.id) {
    return item.id;
  }

  const objectKey = item as object;
  const existingKey = legacyKeyMap.get(objectKey);
  if (existingKey) {
    return existingKey;
  }

  const generatedKey = createHistoryItemId();
  legacyKeyMap.set(objectKey, generatedKey);
  return generatedKey;
}

export function getHistoryCanvasId(item: HistoryItem): string {
  return `code-${getHistoryItemKey(item)}`;
}

export function isQrCode(bcid: string): boolean {
  return bcid === 'qrcode' || bcid === 'swissqrcode';
}

export function copyCanvasContentsToClipboard(
  canvas: HTMLCanvasElement,
  onDone: () => void,
  onError: (err: Error) => void,
) {
  canvas.toBlob((blob) => {
    if (blob) {
      const data = [new ClipboardItem({ [blob.type]: blob })];
      navigator.clipboard.write(data).then(onDone, (err) => onError(err));
      return;
    }

    onError(new Error('Blob is null'));
  });
}

