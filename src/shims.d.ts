interface KV<V> {
  [key: string]: V;
}

interface TextNode {
  type: 'text';
  text: string;
}

interface SimpleNode {
  type: string;
}

interface ContentNode {
  type: string;
  content: (ContentNode | TextNode | SimpleNode)[];
  attrs?: object;
}

interface Card {
  id: string;
  name: string;
  count: number;
  tags: string[];
  icon: string;
  content: (ContentNode | SimpleNode)[];
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
