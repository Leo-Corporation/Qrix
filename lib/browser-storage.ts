import { GeneratedItem, History, ItemType } from "@/types/history";

export function GetHistory(): History {
  if (typeof window !== "undefined") {
    return JSON.parse(
      localStorage.getItem("history") ||
        JSON.stringify({ barCodes: [], qrCodes: [] })
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
