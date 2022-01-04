import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { fetchEmojiList } from './emojiList';
import { SupriseQRCode } from './SupriseQRCode';

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
            ' None selected yet'
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
        <SupriseQRCode emoji={selectedEmoji} />
      </section>
    </div>
  );
}

export default App;
