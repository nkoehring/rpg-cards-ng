interface Settings {
  color: string;
}

interface StoredStuff {
  decks: Deck[];
  defaults: Settings;
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

interface Card {
  id: string;
  name: string;
  count: number;
  tags: string[];
  icon: string;
  contents: CardContent[];
  backIcon?: string;
  color?: string;
}

interface CardContent {
  type: string;
  params: (string | number)[];
}
