import { Ref } from 'vue'
import { PageSize, CardSize, Arrangement } from './consts'

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
  id: string;
  name: string;
  tags: string[];
  icon: string;
  content: ICardContent;
  backIcon?: string;
  color?: string;
}

export interface IDeck {
  id: string;
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
  decks: Ref<{ [key: string]: IDeck }>;
  notifications: Ref<Notification[]>;
  icons: Ref<string[]>;
  popup: Ref<boolean>;
}
