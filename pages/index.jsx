import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Welcome to Modern Fantasy!</h1>
      <div>
        <Link href="/login"><h3>Log in</h3></Link>
      </div>
      <div>
        <Link href="/newuser"><h3>Sign up</h3></Link>
      </div>
    </div>
  );
}
