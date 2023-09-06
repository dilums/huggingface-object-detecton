type Data = {
  score: number;
  label: string;
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}[];
export function processData(data: Data) {
  return data.map((i, index) => ({
    score: i.score,
    label: i.label,
    x: i.box.xmin,
    y: i.box.ymin,
    width: i.box.xmax - i.box.xmin,
    height: i.box.ymax - i.box.ymin,
    key: index,
  }));
}
