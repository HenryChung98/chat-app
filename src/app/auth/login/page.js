import Link from "next/link";

export default function Login() {
  return (
    <>
      <div>
        <div>
          <div className="m-5">
            <label>Email</label>
            <input />
          </div>
          <div className="m-5">
            <label>Password</label>
            <input />
          </div>
        </div>
        <Link href="/auth/signup">signup</Link>
      </div>
    </>
  );
}
