import { useState, useEffect } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";

const TweetFeed = ({ user }) => {
  const [tweetText, setTweetText] = useState("");
  const [tweets, setTweets] = useState([]);

  // Cargar tweets guardados al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("tweets");
    if (stored) {
      setTweets(JSON.parse(stored));
    }
  }, []);

  // Guardar tweets cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  // Publicar nuevo tweet
  const handleTweet = () => {
    if (!tweetText.trim()) return;

    const newTweet = {
      id: Date.now(),
      user: user.username,
      text: tweetText,
      likes: 0,
      date: new Date().toLocaleString(),
    };

    setTweets([newTweet, ...tweets]);
    setTweetText("");
  };

  // Dar like a un tweet
  const likeTweet = (id) => {
    setTweets((prev) =>
      prev.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  // Eliminar tweet
  const deleteTweet = (id) => {
    setTweets(tweets.filter((tweet) => tweet.id !== id));
  };

  return (
    <div className="tweet-section">
      <h2>Publicar un tweet</h2>
      <textarea
        placeholder="¿Qué está pasando?"
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
        maxLength={280}
        rows={3}
      />
      <div>
        <button onClick={handleTweet}>Twittear</button>
        <small>{280 - tweetText.length} caracteres restantes</small>
      </div>

      <hr />

      <h2>Feed de Tweets</h2>
      {tweets.length === 0 && <p>No hay tweets aún.</p>}
      {tweets.map((tweet) => (
        <div key={tweet.id} className="tweet">
          <div className="tweet-header">
            <strong>@{tweet.user}</strong>
            <span className="tweet-date">{tweet.date}</span>
          </div>
          <p>{tweet.text}</p>
          <div className="tweet-actions">
            <button onClick={() => likeTweet(tweet.id)}>
              <FaHeart /> {tweet.likes}
            </button>
            <button onClick={() => deleteTweet(tweet.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetFeed;
