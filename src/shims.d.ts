interface Field {
  type: string;
  params: (string | number)[];
}

interface Card {
  id: string;
  name: string;
  count: number;
  tags: string[];
  icon: string;
  content: Field[];
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
