/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { links } from '../assets/constants';
import { logo } from '../assets';

const NavLinks = ({ handleClick }) => (
  <div className="">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row justify-start items-center my-8 text-sm font-medium text-cyan-500 hover:text-cyan-400 pl-4'
            : 'flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-white pl-4'
        }
        end
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="hidden flex-col w-[200px] py-8 bg-[#191624] md:flex">
        <img
          src="https://www.transparentpng.com/thumb/music/png-music-clipart-5.png"
          alt="logo"
          className="w-full h-14 object-contain"
        />
        <NavLinks />
      </div>

      <div className="absolute block top-6 right-3 md:hidden z-10">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/4 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden scroll-smooth ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        } `}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
