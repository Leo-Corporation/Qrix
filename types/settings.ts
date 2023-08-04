import { TextXAlign } from "./text-x-align";
import { TextYAlign } from "./text-y-align";

export interface Settings {
  barcodeType: string;
  barcodeFg: string;
  barcodeBg: string;
  qrFg: string;
  qrBg: string;
  format: "png" | "jpg" | "jpeg" | "bmp";
  textxalign?: TextXAlign;
  textyalign?: TextYAlign;
  textsize?: number;
}
