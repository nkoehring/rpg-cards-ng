import { Ref } from 'vue'

// page width x page height
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

// card width x card height
export const enum CardSize {
  Poker = '64x89',
  Bridge = '57x89'
}

export const enum Arrangement {
  DoubleSided = 'doublesided',
  FrontOnly = 'frontonly',
  SideBySide = 'sidebyside'
}

export interface KV<V> {
  [key: string]: V;
}

export interface IContentBlock {
  type: string;
  data: object;
}

export interface ICardContent {
  time: number;
  blocks: IContentBlock[];
  version: string;
}

export interface ICard {
  id: number;
  name: string;
  tags: string[];
  icon: string;
  content: ICardContent;
  backIcon?: string;
  color?: string;
}

export interface IDeck {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  cards: ICard[];
  cardSize: CardSize;
  arrangement: Arrangement;
  pageSize: PageSize;
  roundedCorners: boolean;
}

export interface Settings {
  /* no global settings, yet */
}

export interface StoredSettings {
  decks: IDeck[];
  defaults: Settings;
}

export interface Notification {
  level: 'warning' | 'error' | 'info';
  title: string;
  content: string;
  dismissed: boolean;
}

export interface State {
  settings: Ref<Settings>;
  decks: Ref<IDeck[]>;
  notifications: Ref<Notification[]>;
  initialized: Ref<boolean>;
}
