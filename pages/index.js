import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Suggestions Portal</h1>
      <p>Welcome to the Ministry of Finance Suggestions Portal.</p>
      <ul>
        <li>
          <Link href="/feedback">Submit a Suggestion</Link>
        </li>
        <li>
          <Link href="/dashboard">View Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}
