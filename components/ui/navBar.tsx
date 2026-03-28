import Link from "next/link";
import "./navBar.css";

export default function NavBar() {
	return (
		<nav className="navBar" aria-label="Main navigation">
			<Link className="brand" href="/">
				FeedAnalysis
			</Link>

			<Link className="loginButton" href="/">
				Log In
			</Link>
		</nav>
	);
}
