import { Link } from "react-router";

const Navbar = () => {
  return (
    // <nav>
    <div className="container flex justify-between items-center min-w-screen">
      <div className="m-2 mx-5">
        <ul className="flex">
          <li>
            <Link
              to="/"
              className=" text-3xl text-blue-400 hover:text-blue-200 "
            >
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="m-2 mx-5">
        <ul className="flex space-x-10 ">
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
    </div>
    // </nav>
  );
};

export default Navbar;
