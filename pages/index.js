import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch('api/chatApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data.message);
        });
    } catch (error) {
      setError(!error);
    }
  };

  return (
    <div>
      <Head>
        <title>The Buddha AI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.mainTitle}>Ask the Buddha AI</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Ask the Buddha anything"
            className={styles.textarea}
          />

          <button className={styles.button} type="submit">
            Send
          </button>
        </form>
        {response && (
          <div className={styles.response}>
            <b>Buddha:</b> {response}
          </div>
        )}
        {error && (
          <div className={styles.response}>
            <b>Disciple:</b> Sorry the Budha is restint right now
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        2023 - Coded by Mariano De Simone - All Rights Reserved
      </footer>
    </div>
  );
}
