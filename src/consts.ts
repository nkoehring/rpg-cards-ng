import { CardSize, PageSize, Arrangement } from './types'

export const cardSizeOptions = [
  { title: '88x62 (Poker)', value: CardSize.Poker },
  { title: '88x56 (Bridge)', value: CardSize.Bridge }
]

export const pageSizeOptions = [
  { title: 'A4', value: PageSize.A4 }, // 210mm × 297mm
  { title: 'US Letter', value: PageSize.USLetter }, // 8.5in × 11in
  { title: 'JIS-B4', value: PageSize.JISB4 }, // 182mm × 257mm
  { title: 'A3', value: PageSize.A3 }, // 297mm × 420mm
  { title: 'A5', value: PageSize.A5 }, // 148mm × 210mm
  { title: 'US Legal', value: PageSize.USLegal }, // 8.5in × 14in
  { title: 'US Ledger', value: PageSize.USLedger }, // 11in × 17in
  { title: 'JIS-B5', value: PageSize.JISB5 } // 257mm × 364mm
]

export const arrangementOptions = [
  { title: 'Double Sided', value: Arrangement.DoubleSided },
  { title: 'Only Front Sides', value: Arrangement.FrontOnly },
  { title: 'Side by Side', value: Arrangement.SideBySide }
]

export const defaultPageSize = pageSizeOptions[0].value
export const defaultCardSize = cardSizeOptions[0].value
export const defaultArrangement = arrangementOptions[0].value
