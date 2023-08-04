import { TextXAlign } from "./text-x-align";
import { TextYAlign } from "./text-y-align";

export interface History {
  barCodes: GeneratedItem[];
  qrCodes: GeneratedItem[];
}

export interface GeneratedItem {
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
}

export type ItemType = "barcode" | "qrcode";
