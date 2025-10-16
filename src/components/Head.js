import { useEffect, useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import img from "../assets/image0.jpeg";

const user = {
  name: 'Yara Mawla',
  email: 'yara.mawla@example.com',
  imageUrl: img,
};

const navigation = [
  { name: 'About', href: '#about', current: false },
  { name: 'Formations', href: '#formations', current: false },
  { name: 'Experience', href: '#experience', current: false },
  { name: 'Projects', href: '#projects', current: false },
  { name: 'Skills', href: '#skills', current: false },
  { name: 'Certificates', href: '#Certificates', current: false },
  { name: 'Contact', href: 'mailto:yara.mawla@example.com?subject=Contact from Website', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ModernNavigation() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = navigation
        .map(item => item.href.startsWith('#') ? item.href.replace('#', '') : null)
        .filter(Boolean);
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 100 && r.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <Disclosure
        as="nav"
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-200'
            : 'bg-gradient-to-b from-white/70 to-transparent'
        }`}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* LOGO */}
                <div className="flex items-center">
                  <a href="/" aria-label="Home" className="flex items-center space-x-2">
                    <div className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                      YM
                    </div>
                    <span className="hidden sm:inline text-slate-600 font-medium text-sm">
                      Portfolio
                    </span>
                  </a>
                </div>

                {/* NAVIGATION DESKTOP */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-1">
                    {navigation.map((item) => {
                      const isActive = activeSection === item.href.replace('#', '');
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            'relative px-3 py-2 text-sm font-semibold rounded-full transition-all duration-300',
                            isActive
                              ? 'text-fuchsia-700'
                              : 'text-slate-700 hover:text-fuchsia-700'
                          )}
                        >
                          {item.name}
                          {isActive && (
                            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 rounded-full animate-expandWidth" />
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* MENU UTILISATEUR */}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex items-center rounded-full ring-2 ring-pink-400/40 hover:ring-fuchsia-500/60 transition-all duration-300">
                          <span className="sr-only">Open user menu</span>
                          <img
                            alt={user.name}
                            src={user.imageUrl}
                            className="size-9 rounded-full object-cover"
                          />
                        </MenuButton>
                      </div>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white/95 backdrop-blur-lg py-1 shadow-lg ring-1 ring-pink-200 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="mailto:saad.khattab@example.com"
                              className={classNames(
                                active ? 'bg-pink-50' : '',
                                'block px-4 py-2 text-sm text-slate-700'
                              )}
                            >
                              Me contacter
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>

                {/* BOUTON MOBILE */}
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:text-fuchsia-600 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            {/* NAVIGATION MOBILE */}
            <DisclosurePanel className="md:hidden bg-white/95 backdrop-blur-md border-t border-pink-200">
              <div className="space-y-1 px-4 py-3">
                {navigation.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        'block px-3 py-2 rounded-md text-base font-medium transition-all duration-300',
                        isActive
                          ? 'text-fuchsia-700 bg-pink-50'
                          : 'text-slate-700 hover:text-fuchsia-700 hover:bg-pink-50'
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  );
                })}
              </div>

              {/* Infos utilisateur (mobile) */}
              <div className="border-t border-pink-200 py-4 px-5 flex items-center space-x-3">
                <img
                  alt={user.name}
                  src={user.imageUrl}
                  className="size-10 rounded-full ring-2 ring-pink-300/40"
                />
                <div>
                  <p className="text-slate-800 font-medium">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {/* Animation underline */}
      <style jsx>{`
        @keyframes expandWidth {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-expandWidth {
          animation: expandWidth 0.3s ease-out forwards;
          transform-origin: left;
        }
      `}</style>
    </div>
  );
}
