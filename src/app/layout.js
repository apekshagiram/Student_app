import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="border-b px-6 py-3 bg-black">
          <NavigationMenu className="text-white">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {children} {/* moves to current page  */}
      </body>
    </html>
  );
}
