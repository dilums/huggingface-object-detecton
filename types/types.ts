export type MatchItem = {
  extract: string;
  colorIndex: number;
  score: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  key: number;
};

export type DetectResponse = {
  width: number;
  height: number;
  matches: MatchItem[];
  labels: string[];
};
