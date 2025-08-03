import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={navContainer}>
        <h2 style={{ color: 'white', margin: 0 }}>My Company</h2>
        <div style={linkContainer}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/services" style={linkStyle}>Services</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#333',
  padding: '10px 20px',
};

const navContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkContainer = {
  display: 'flex',
  gap: '15px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default Navbar;
