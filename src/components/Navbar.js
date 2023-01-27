import React, { useState } from "react";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const activeLink = "flex items-center mx-2 text-white";
  const normalLink = "flex items-center mx-2";

  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      name: "Trendings",
      icon: <LocalFireDepartmentOutlinedIcon />,
      to: "/",
    },
    {
      id: 2,
      name: "Movies",
      icon: <TheatersOutlinedIcon />,
      to: "/moviesSection",
    },
    {
      id: 3,
      name: "TV Series",
      icon: <TvOutlinedIcon />,
      to: "/tvseries",
    },
    {
      id: 4,
      name: "Search",
      icon: <SearchOutlinedIcon />,
      to: "/search",
    },
  ];

  return (
    <div className="bg-[#161616] p-4 mt-0 fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between flex-wrap items-center text-gray-500 w-[85%] md:justify-start">
        <div>
          <h2
            className="text-[#fff] text-xl font-extrabold mr-3"
            onClick={window.scroll(0, 0)}
          >
            MoviesHub
          </h2>
        </div>
        <ul className="hidden md:flex flex-wrap items-center">
          {links.map(({ to, name, icon, id }) => (
            <li key={id}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {icon}
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-[60px] left-0 w-full h-screen bg-white">
            {links.map(({ to, name, icon, id }) => (
              <li
                key={id}
                className="px-4 py-6 cursor-pointer capitalize text-indigoDye text-4xl"
              >
                <NavLink onClick={() => setNav(!nav)} to={to}>
                  {icon}
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
