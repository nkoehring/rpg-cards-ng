export const enum PageSize {
  A4 = '210mm 297mm',
  USLetter = '8.5in 11in',
  JISB4 = '182mm 257mm',
  A3 = '297mm 420mm',
  A5 = '148mm 210mm',
  USLegal = '8.5in 14in',
  USLedger = '11in 17in',
  JISB5 = '257mm 364mm'
}

export const enum CardSize {
  Poker = '89x64',
  Bridge = '89x57'
}

export const enum Arrangement {
  DoubleSided = 'doublesided',
  FrontOnly = 'frontonly',
  SideBySide = 'sidebyside'
}

export interface KV<V> {
  [key: string]: V;
}

export interface ContentBlock {
  type: string;
  data: object;
}

export interface CardContent {
  time: number;
  blocks: ContentBlock[];
  version: string;
}

export interface Card {
  id: string;
  name: string;
  count: number;
  tags: string[];
  icon: string;
  content: CardContent;
  backIcon?: string;
  color?: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  cards: Card[];
  cardSize: CardSize;
}

export interface Settings {
  color: string;
}

export interface StoredStuff {
  decks: Deck[];
  defaults: Settings;
}
