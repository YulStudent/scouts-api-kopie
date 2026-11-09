// src/components/NavBar.tsx
import { Link, NavLink, useLocation } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { buttonVariants } from '../components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, 
} from '../components/ui/navigation-menu';
import scoutsLogo from '../assets/scoutslogodetortels_wit.png';

interface NavChild {
  to: string;
  label: string;
}

interface NavLinkItem {
  to?: string;
  label: string;
  children?: NavChild[];
}

const links: NavLinkItem[] = [
  { to: '/home', label: 'Home' },
  {
    label: 'Over ons',
    children: [
      { to: '/over-ons/totem-galerij', label: 'Totem galerij' },
      { to: '/over-ons/leiders', label: 'Leiders' },
      { to: '/over-ons/eenheidsleiders', label: 'EenheidsLeiders' },
    ],
  },
  {
    label: 'Activiteiten',
    children: [{ to: '/activiteiten/technieken', label: 'Technieken' }],
  },
  {
    label: 'Praktisch',
    children: [
      { to: '/praktisch/documenten', label: 'Documenten' },
      { to: '/praktisch/planning', label: 'Planning' },
      { to: '/praktisch/uniformen', label: 'Uniformen' },
    ],
  },
];


function NavMenu({vertical = false, }: {
  vertical?: boolean;
}) {
  const { pathname } = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList
        className={vertical ? 'flex-col items-start' : 'gap-1'}
      >
        {links.map(({ to, label, children }) => {
          if (!children) {
            return (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink
                  render={<NavLink to={to!} />}
                  active={pathname === to || pathname.startsWith(to + '/')}
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }
          if (vertical) {
            return (
              <NavigationMenuItem key={label}>
                <span className="px-2.5 text-sm font-medium text-muted-foreground">
                  {label}
                </span>
                <ul className="ml-3 flex flex-col">
                  {children.map((child) => (
                    <li key={child.to}>
                      <NavigationMenuLink
                        render={<NavLink to={child.to} />}
                        active={pathname === to || pathname.startsWith(to + '/')}
                      >
                        {child.label}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuItem>
            );
          }
          return (
            <NavigationMenuItem key={label}>
              <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-72 grid-cols-2 gap-1 p-2">
                  {children.map((child) => (
                    <li key={child.to}>
                      <NavigationMenuLink
                        render={<NavLink to={child.to} />}
                        active={pathname === to || pathname.startsWith(to + '/')}
                      >
                        {child.label}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-red-900  backdrop-blur">
      <div className="flex h-20 w-full items-center px-6">
        <Link
          to="/home"
          className="flex items-center gap-2 font-semibold text-primary mr-6"
        >
          <img src={scoutsLogo} alt="Logo" className="h-18"/>
          
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-end gap-10">
          <NavMenu />
          <Link
            to="/inschrijven"
            className={buttonVariants({ variant: 'outline' })}
          >
            Inschrijven
          </Link>
        </div>

        <button
          className="ml-auto md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t md:hidden bg-background">
          <div className="px-6 py-4">
            <NavMenu vertical />
          </div>
        </div>
      )}
    </header>
  );
}