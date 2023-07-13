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
  textxalign:
    | "offleft"
    | "left"
    | "center"
    | "right"
    | "offright"
    | "justify"
    | undefined; // Always good to set this
  backgroundcolor: string;
}

export type ItemType = "barcode" | "qrcode";
