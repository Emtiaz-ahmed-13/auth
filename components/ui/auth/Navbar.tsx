import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-xl font-semibold">MyApp</h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-gray-400">
              Register
            </Link>
          </li>
          <li>
            <Link href="/admin/dashboard" className="hover:text-gray-400">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
