interface KV<V> {
  [key: string]: V;
}

interface ContentBlock {
  type: string;
  data: object;
}

interface CardContent {
  time: number;
  blocks: ContentBlock[];
  version: string;
}

interface Card {
  id: string;
  name: string;
  count: number;
  tags: string[];
  icon: string;
  content: CardContent;
  backIcon?: string;
  color?: string;
}

interface Deck {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  cards: Card[];
  cardWidth: number;
  cardHeight: number;
  titleFontSize?: number;
}

interface Settings {
  color: string;
}

interface StoredStuff {
  decks: Deck[];
  defaults: Settings;
}
