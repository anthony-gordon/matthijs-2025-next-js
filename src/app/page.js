import Image from "next/image";
import styles from "./page.module.css";
import HomePage from '../components/HomePage';
// import Header from './components/Header';


export default async function Home() {
  const SHEET_ID = '1mqsNB3uBkdSgiM-yXvVNxont0-swRhBsDpAsibeQpnA';
  const API_KEY = 'AIzaSyCHRasM4agErGNMa64zlVjFLB1HlLra2Nc';
  const RANGE = 'Sheet1!A1:Z100';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  const res = await fetch(url, {
    cache: 'no-store' // <-- equivalent to getServerSideProps (no caching)
  });
  const data = await res.json();
  const [keys, ...rows] = data.values;
  const items = rows.map(row =>
    Object.fromEntries(keys.map((key, i) => [key, row[i]]))
  );
  return (
    <div className={styles.page}>
      <HomePage items={items}/>
    </div>
  );
}
