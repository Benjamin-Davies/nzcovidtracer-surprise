import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { fetchEmojiList } from './emojiList';
import { SupriseQRCode } from './SupriseQRCode';

const LINKS = [
  [
    'https://github.com/Benjamin-Davies/nzcovidtracer-suprise',
    'Suprise Generator Code',
  ],
  ['https://github.com/minhealthnz/nzcovidtracer-app', 'NZ COVID Tracer Code'],
  [
    'https://github.com/minhealthnz/nzcovidtracer-app/commit/a00dd660c71750fc11a1109172c2a27448e31623#diff-4fee9eeb32d15c66ca0dd045842e1effe414d069c987ac801c73a2cc3fc7db9a',
    'Commit where the easter egg was added',
  ],
];

function App() {
  const [emojiList, setEmojiList] = useState();
  useEffect(() => {
    fetchEmojiList().then(setEmojiList);
  }, [setEmojiList]);

  const [selectedEmoji, setSelectedEmoji] = useState([]);
  const selectEmoji = useCallback(
    (ev) => {
      const emoji = ev.target.innerText;
      setSelectedEmoji((old) => [...old, emoji]);
    },
    [setSelectedEmoji]
  );
  const deselectEmoji = useCallback(
    (ev) => {
      const index = parseInt(ev.target.getAttribute('data-index'));
      setSelectedEmoji((old) => old.filter((_, i) => i !== index));
    },
    [setSelectedEmoji]
  );

  if (!emojiList) {
    return <h1>Loading Emoji List</h1>;
  }

  return (
    <div className="App">
      <header>
        <h1>NZ COVID Tracer Suprise</h1>
        <h2>Create your own emoji suprise!</h2>
        <p>
          This project is not created by or affiliated with the Ministy of
          Health or the New Zealand Government.
        </p>
      </header>
      <section>
        <h1>Pick An Emoji</h1>
        <p>
          Click on the emoji that you would like to display. You can choose
          (almost) as many as you'd like, however you are limited to those in
          the list below because the app only allows certain emoji.
        </p>
        <p>
          Selected Emoji (click to deselect):
          {selectedEmoji.length > 0 ? (
            <>
              {selectedEmoji.map((emoji, index) => (
                <button
                  className="emoji-preview"
                  key={index}
                  data-index={index}
                  onClick={deselectEmoji}
                >
                  {emoji}
                </button>
              ))}
            </>
          ) : (
            ' none selected yet'
          )}
        </p>
        <div className="emoji-grid">
          {emojiList.map((emoji, index) => (
            <button key={index} onClick={selectEmoji}>
              {emoji}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h1>Your QR Code</h1>
        <p>Right-click or tap-and-hold to save.</p>
        <SupriseQRCode emoji={selectedEmoji} />
      </section>
      <section>
        <h1>Background</h1>
        <p>
          The NZ COVID Tracer app is Free and Open Source Software,
          (specifically{' '}
          <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL</a>)
          meaning that anyone can download the source code and make their own
          version of the app. Being the curious man I am, I (Ben) decided to
          have a look and see how it works. As I skimmed the list of files, one
          folder named "easeterEgg" caught my eye. The term "Easter Egg" refers
          to a hidden feature, often put there by the developers to have a bit of fun. Intrigued, I dug deeper and found that if you
          modify the QR Code slightly, spelling "NZCOVIDTRACER" backwards
          ("RECARTDIVOCZN"), then you could make the app display emojis. I'm not
          sure if the Ministry of Health was keeping this secret for an event,
          but nethertheless I found it and am sharing it with you now.
        </p>
      </section>
      <footer>
        <h1>Links</h1>
        <p>
          {LINKS.map(([href, title]) => (
            <a href={href} target="_blank">
              {title}
            </a>
          ))}
        </p>
      </footer>
    </div>
  );
}

export default App;
