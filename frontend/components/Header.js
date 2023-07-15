import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '@/state';

const Header = () => {
  const token = useSelector(state => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (token) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return alert("Something went wrong. Try again!!");
      }

      dispatch(setLogin(null));
      router.push("/signin");
    }
  }

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        <Link href="/" className="text-white text-2xl font-bold">Spicejet</Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>

              <Link href="/" className="text-white hover:text-gray-300">About</Link>

            </li>
            <li>

              <Link href="/" className="text-white hover:text-gray-300">Home</Link>

            </li>
            <li>
              <Link href="/" className="text-white hover:text-gray-300">My Booking</Link>
            </li>
          </ul>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button
            type="button"
            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="hidden"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16V5H4v1zm0 5h16v-1H4v1zm0 5h16v-1H4v1z"
              />
              <path
                className="block"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 6h24v-1H0v1zm0 5h24v-1H0v1zm0 5h24v-1H0v1z"
              />
            </svg>
          </button>
        </div>
        <div>
          {token &&
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
