import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Image from "next/image";

export default function MainNavbar() {
  return (
    <Navbar 
      className="py-10 px-24 flex items-center justify-between"
      shouldHideOnScroll
    >
      <div className="flex items-center gap-[8rem]">
        <NavbarBrand>
          <h1 className="text-[2.25rem] font-bold">T-Education.</h1>
        </NavbarBrand>
        <NavbarContent className="flex items-center gap-14" justify="center">
          <NavbarItem className="text-[1.45rem]" isActive>
            <Link color="foreground" className="text-[1.25rem]" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem className="text-[1.45rem]">
            <Link color="foreground" className="text-[1.25rem]" href="#">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem className="text-[1.45rem]">
            <Link color="foreground" className="text-[1.25rem]" href="#">
              Prices
            </Link>
          </NavbarItem>
          <NavbarItem className="text-[1.45rem]">
            <Link color="foreground" className="text-[1.25rem]" href="#">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>
      <NavbarContent className="flex gap-4" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}