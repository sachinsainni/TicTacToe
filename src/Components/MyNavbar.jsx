import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Tooltip } from "@nextui-org/react";
import { FaGamepad } from "react-icons/fa";

export default function MyNavbar() {
    return (
        <Navbar
            maxWidth='full'
            className="bg-gradient-to-r from-purple-100 to-blue-100 shadow-md"
        >
            <NavbarBrand>
                <FaGamepad className="text-2xl text-purple-600 mr-2" />
                <p className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                    Tic-Tac-Toe
                </p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Tooltip content="View game statistics">
                        <Link
                            color="foreground"
                            href="#"
                            className="text-gray-700 hover:text-purple-600 transition-colors"
                        >
                            Stats
                        </Link>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem>
                    <Tooltip content="How to play">
                        <Link
                            color="foreground"
                            href="#"
                            className="text-gray-700 hover:text-purple-600 transition-colors"
                        >
                            Rules
                        </Link>
                    </Tooltip>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Button
                        as={Link}
                        variant="light"
                        className="font-semibold hover:text-purple-600 transition-colors"
                    >
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold 
                                 shadow-lg hover:shadow-purple-500/50 transition-all duration-300
                                 hover:scale-105"
                    >
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}