export const barcodeTypes = [
  {
    value: "code128",
    label: "Code128",
  },
  {
    value: "code11",
    label: "Code11",
  },
  {
    value: "code16k",
    label: "Code16k",
  },
  {
    value: "code2of5",
    label: "Code25",
  },
  {
    value: "code39",
    label: "Code39",
  },
  {
    value: "code39ext",
    label: "Code39 Extended",
  },
  {
    value: "code49",
    label: "Code49",
  },
  {
    value: "code93",
    label: "Code93",
  },
  {
    value: "code93ext",
    label: "Code93 Extended",
  },
  {
    value: "datamatrix",
    label: "DataMatrix",
  },
  {
    value: "ean13",
    label: "EAN-13",
  },
  {
    value: "ean2",
    label: "EAN-2",
  },
  {
    value: "ean5",
    label: "EAN-5",
  },
  {
    value: "ean8",
    label: "EAN-8",
  },
  {
    value: "upca",
    label: "UPC-A",
  },
  {
    value: "upce",
    label: "UPC-E",
  },
  {
    value: "msi",
    label: "MSI",
  },
  {
    value: "isbn",
    label: "ISBN",
  },
  {
    value: "ismn",
    label: "ISMN",
  },
  {
    value: "issn",
    label: "ISSN",
  },
  {
    value: "telepen",
    label: "Telepen",
  },
  {
    value: "telepennumeric",
    label: "Telepen Numeric",
  },
];
export function getLabelFromValue(value: string): string {
  for (let i = 0; i < barcodeTypes.length; i++) {
    if (barcodeTypes[i].value === value) return barcodeTypes[i].label;
  }
  return "";
}
