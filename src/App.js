import './App.css';
import { useEffect, useState } from 'react';
import { fetchEmojiList } from './emojiList';

function App() {
  const [emojiList, setEmojiList] = useState();
  useEffect(() => {
    fetchEmojiList().then(setEmojiList);
  }, [setEmojiList]);

  if (!emojiList) {
    return <h1>Loading Emoji List</h1>
  }

  return <div className="App">{JSON.stringify(emojiList)}</div>;
}

export default App;
