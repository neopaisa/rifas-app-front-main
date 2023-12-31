/* eslint-disable react/react-in-jsx-scope */
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../../features/login/userData";
import logoM from "../../assets/logo/logoM.png";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AvatarNavbar() {
  const userData = useSelector((state) => state.user.value);
  const rol = userData.rol;
  const [navigation, setNavigation] = useState([]);
  const navigationRoot = [
    { name: "General", href: "/admin" },
    { name: "Vendedores", href: "/vendedores" },
    { name: "Boletas Disponibles", href: "/boletas-disponibles" },
    { name: "Ingresos", href: "/ingresos" },
    { name: "Gastos", href: "/gastos" },
    { name: "Total", href: "/total" },
  ];
  const navigationAdmin = [
    { name: "General", href: "/admin" },
    { name: "Vendedores", href: "/vendedores" },
    { name: "Boletas Disponibles", href: "/boletas-disponibles" },
    { name: "Ingresos", href: "/ingresos" },
    { name: "Gastos", href: "/gastos" },
  ];
  const navigationUser = [
    { name: "Boletas Disponibles", href: "/boletas-disponibles" },
  ];

  useEffect(()=>{
    if (rol == 'root'){
      setNavigation(navigationRoot)
    }else if (rol =='administrador'){
      setNavigation(navigationAdmin)
    }else{
      setNavigation(navigationUser)
    }
  },[])
  

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="avatar-navbar fixed top-0 left-0 right-0 bg-white z-50" > 
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logoM}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={logoM}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-800 hover:bg-gray-300 hover:text-gray rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-white-400 p-1 text-gray-500 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-400"
                >
                  <span className="sr-only">Notificaciones</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-400">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={logoM}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Perfil
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Ajustes
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={handleLogout}
                            to="/"
                            //onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Salir
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-blue-500 text-white"
                      : "text-gray hover:bg-gray-300 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </div>
  );
}

export default AvatarNavbar;
