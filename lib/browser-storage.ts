import { GeneratedItem, History, ItemType } from "@/types/history";
import { Settings } from "@/types/settings";

export function GetHistory(): History {
  if (typeof window !== "undefined") {
    return JSON.parse(
      localStorage.getItem("history") ||
        JSON.stringify({ barCodes: [], qrCodes: [] }),
    );
  }
  return { barCodes: [], qrCodes: [] };
}

export function AddHistory(item: GeneratedItem, type: ItemType) {
  let h: History = GetHistory();
  if (!h) {
    if (type == "barcode") {
      h = {
        barCodes: [item],
        qrCodes: [],
      };
    } else {
      h = {
        barCodes: [],
        qrCodes: [item],
      };
    }
    localStorage.setItem("history", JSON.stringify(h));
    return;
  }
  if (type == "barcode") {
    h.barCodes.push(item);
  } else {
    h.qrCodes.push(item);
  }
  localStorage.setItem("history", JSON.stringify(h));
}
export function RemoveHistoryItem(i: number, type: ItemType) {
  let h: History = GetHistory();
  if (type === "barcode") {
    h.barCodes.splice(i, 1);
  } else {
    h.qrCodes.splice(i, 1);
  }
  localStorage.setItem("history", JSON.stringify(h));
}

export function GetSettings(): Settings {
  if (typeof window !== "undefined") {
    return JSON.parse(
      localStorage.getItem("qrix_settings") ||
        JSON.stringify({
          barcodeType: "code128",
          barcodeFg: "#000000",
          barcodeBg: "#FFFFFF",
          qrFg: "#000000",
          qrBg: "#FFFFFF",
          format: "png",
          textxalign: "center",
          textyalign: "below",
          textsize: 8,
          qrTextxalign: "center",
          qrTextyalign: "below",
          qrTextsize: 8,
          qrShowText: false,
          qrType: "qrcode",
        }),
    );
  }
  return {
    barcodeType: "code128",
    barcodeBg: "#FFFFFF",
    barcodeFg: "#000000",
    qrBg: "#FFFFFF",
    qrFg: "#000000",
    format: "png",
    textxalign: "center",
    textyalign: "below",
    textsize: 8,
    qrTextxalign: "center",
    qrTextyalign: "below",
    qrTextsize: 8,
    qrShowText: false,
    qrType: "qrcode",
  };
}
export function SetSettings(settings: Settings) {
  localStorage.setItem("qrix_settings", JSON.stringify(settings));
}
