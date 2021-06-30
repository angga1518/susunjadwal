import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Image, useDisclosure } from "@chakra-ui/react";
import LogoSunjad from 'assets/Beta/LogoSunjad.svg'
import { Container, HamburgerIcon, HeaderLink, NavLinkWrapper, SignOutLink, WrapperHamburger } from "./styles";
import { useSelector } from "react-redux";


const LINKS = [
  { to: "/susun", label: "Buat Jadwal" },
  { to: "/jadwal", label: "Daftar Jadwal" },
  { to: "/update", label: "Update Matkul" },
  { to: "/kontributor", label: "Kontributor" },
  
];

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const auth = useSelector(state => state.auth);

  function toggleMenu() {
    return isOpen ? onClose() : onOpen()
  }

  return (
    <Container>
      <Box mr='auto'>
        <Link to="/">
          <Image 
            src={LogoSunjad}
            alt='logo'
            objectFit='contain'
            w={{base:'140px',lg:'initial'}}
          />
        </Link>
      </Box>
      <WrapperHamburger open={isOpen} onClick={toggleMenu}>
        <HamburgerIcon />
      </WrapperHamburger>
      {auth ? <NavLinks /> : null}
      <SideBar onClose={onClose} isOpen={isOpen} />
    </Container>
  );
  // The checking above is added for auth only
}

export default Header;

const NavLinks = () => {
  return (
    <NavLinkWrapper>
      {LINKS.map(({ to, label }) => (
        <HeaderLink key={to} to={to}>
          {label}
        </HeaderLink>
      ))}
      <SignOutLink to="/logout">
        Sign Out  
      </SignOutLink>
    </NavLinkWrapper>
  )
}

const SideBar = ({onClose, isOpen}) => {
  const firstField = React.useRef()
  return (
    <Drawer initialFocusRef={firstField} onClose={onClose} isOpen={isOpen} size='full'>
      <DrawerOverlay bg='transparent' />
      <DrawerContent maxW='undefined' px='1.5rem'>
        <DrawerBody d='contents' dir='col' textAlign='left'>
          {LINKS.map(({ to, label }) => (
            <HeaderLink onClick={onClose} key={to} to={to}>
              {label}
            </HeaderLink>
          ))}
          <SignOutLink to="/logout">
            Sign Out  
          </SignOutLink>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

