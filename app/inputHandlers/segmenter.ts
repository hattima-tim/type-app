const segmentToChar = (str: string) => {
  const charSegmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
  const graphemes = Array.from(charSegmenter.segment(str), (s) => s.segment);

  return graphemes;
};

const segmentToWord = (str: string) => {
  const wordSegmenter = new Intl.Segmenter("bn", { granularity: "word" });
  const words = Array.from(wordSegmenter.segment(str), (s) => s.segment);

  return words;
};

export { segmentToChar, segmentToWord };
