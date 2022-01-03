const RAW_URL =
  'https://raw.githubusercontent.com/minhealthnz/nzcovidtracer-app/main/src/features/easterEgg/util/emoji_whitelist.ts';

const EMOJI_REGEX = /^\s*"(.*)",?$/;

export async function fetchEmojiList() {
  const res = await fetch(RAW_URL);
  const text = await res.text();

  const emoji = [];
  for (const line of text.split('\n')) {
    const parsed = line.match(EMOJI_REGEX);
    if (parsed) {
      emoji.push(parsed[1]);
    }
  }
  return emoji;
}
