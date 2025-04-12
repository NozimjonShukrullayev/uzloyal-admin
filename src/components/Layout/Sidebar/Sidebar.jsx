import {
  FaListAlt,
  FaQuestionCircle,
  FaNewspaper,
  FaBloggerB,
  FaTasks,
  FaLink,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { setActiveMenu } from "../menuSlice/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdLogin } from "react-icons/md";
import { logout } from "../../Login/loginSlice";

const Sidebar = () => {
  const activeMenu = useSelector((state) => state.activeMenu);
  const dispatch = useDispatch();

  const handleMenuClick = (menu) => {
    dispatch(setActiveMenu(menu));
  };

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
  }

  return (
    <>
      <div className="fixed left-0 top-0 w-[15%] h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform">
        <Link
          to="/"
          onClick={() => handleMenuClick("dashboard")}
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <h2 className="font-bold text-2xl">
            <span className="bg-[#f84525] text-white px-2 rounded-md">
              UZLOYAL
            </span>
          </h2>
        </Link>
        <ul className="mt-4 flex flex-col gap-5">
          <li className="mb-1 group">
            <Link
              to="/"
              onClick={() => handleMenuClick("dashboard")}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                activeMenu === "dashboard" ? "bg-blue-800 text-white" : ""
              }`}
            >
              <FaHome className="mr-3 text-lg" />
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>
          {/* categories */}
          <li className="mb-1 group">
            <Link
              to="/categories"
              onClick={() => handleMenuClick("categories")}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                activeMenu === "categories" ? "bg-blue-800 text-white" : ""
              }`}
            >
              <FaListAlt className="mr-3 text-lg" />
              <span className="text-sm">Categories</span>
            </Link>
          </li>
          {/* faqs */}
          <li className="mb-1 group">
            <Link
              to="/faqs"
              onClick={() => handleMenuClick("faqs")}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                activeMenu === "faqs" ? "bg-blue-800 text-white" : ""
              }`}
            >
              <FaQuestionCircle className="mr-3 text-lg" />
              <span className="text-sm">Faqs</span>
            </Link>
          </li>
          {/* news */}
          <li className="mb-1 group">
            <Link
              to="/news"
              onClick={() => handleMenuClick("news")}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                activeMenu === "news" ? "bg-blue-800 text-white" : ""
              }`}
            >
              <FaNewspaper className="mr-3 text-lg" />
              <span className="text-sm">News</span>
            </Link>
          </li>
          {/* blogs */}
          <li className="mb-1 group">
            <Link
              to="/blogs"
              onClick={() => handleMenuClick("blogs")}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                activeMenu === "blogs" ? "bg-blue-800 text-white" : ""
              }`}
            >
              <FaBloggerB className="mr-3 text-lg" />
              <span className="text-sm">Blogs</span>
            </Link>
          </li>
          {/* services */}
          <li className="mb-1 group">
            <Link
              to="/services"
              onClick={() => handleMenuClick("services")}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                activeMenu === "services" ? "bg-blue-800 text-white" : ""
              }`}
            >
              <FaTasks className="mr-3 text-lg" />
              <span className="text-sm">Services</span>
            </Link>
          </li>
          {/* sources */}
          <li className="mb-1 group">
            <Link
              to="/sources"
              onClick={() => handleMenuClick("sources")}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                activeMenu === "sources" ? "bg-blue-800 text-white" : ""
              }`}
            >
              <FaLink className="mr-3 text-lg" />
              <span className="text-sm">Sources</span>
            </Link>
          </li>
          {/* logout */}
          <li className="mb-1 group">
            <Link
              to="/login"
              onClick={logoutHandler}
              className={`flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md`}
            >
              <MdLogin className="mr-3 text-lg" />
              <span className="text-sm">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
