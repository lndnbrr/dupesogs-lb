import Link from 'next/link';
import { useAuth } from '@/utils/context/authContext';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Image from 'next/image';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          <Image src="/images/favicon.ico" alt="dupesogs logo" width={100} height={80} />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href={`/records/${user.uid}`}>
              My Vinyl Record Collection
            </Link>
            <Link className="nav-link" href="/records">
              View Public Vinyl Records
            </Link>
            <Link className="nav-link" href={`/user/${user.uid}`}>
              My Profile
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
