import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center">
        <ul className="flex  space-x-10 ">
          <li>
            <Link
              to="/"
              className=" text-3xl text-blue-400 hover:text-blue-200 "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className=" text-3xl text-blue-400 hover:text-blue-200 "
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className=" text-3xl text-blue-400 hover:text-blue-200 "
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
