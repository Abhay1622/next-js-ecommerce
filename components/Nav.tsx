import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center gap-10">
        <li>
          <Link href="/admin">
            <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin/products">
            <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
              Products
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin/customers">
            <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
              Customers
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin/sales">
            <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
              Sales
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
