function makeWordCapital(word: string): string {
  if (word.length === 0) return word; // Handle empty words
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export default function makeCapital(text: string): string {
  if (text.trim().length === 0) return text; // Handle empty or whitespace-only strings

  const wordList: string[] = text.split(/\s+/); // Split by any whitespace (spaces, tabs, newlines)
  const wordListCapitalized = wordList.map((word) => makeWordCapital(word));
  return wordListCapitalized.join(" ");
}
