import { useState } from 'react';

// SVG Icon inline
const ChevronDownIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={style}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLinkClick = () => {
    onClose();
    setActiveDropdown(null);
  };

  return (
    <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
      <ul>
        <li>
          <a 
            href="/servicios"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Servicios
          </a>
        </li>
        
        <li>
          <a 
            href="/sedes"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Sedes
          </a>
        </li>
        
        <li className={`dropdown ${activeDropdown === 'nosotros' ? 'active' : ''}`}>
          <button
            className="dropdown-toggle nav-link"
            onClick={() => toggleDropdown('nosotros')}
            aria-expanded={activeDropdown === 'nosotros'}
          >
            <span>Nosotros</span>
            <ChevronDownIcon 
              style={{
                marginLeft: '8px',
                transition: 'transform 0.3s ease',
                transform: activeDropdown === 'nosotros' ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <ul className="submenu">
            <li>
              <a 
                href="/nosotros"
                className="submenu-link"
                onClick={handleLinkClick}
              >
                Sobre nosotros
              </a>
            </li>
            <li>
              <a 
                href="/blog"
                className="submenu-link"
                onClick={handleLinkClick}
              >
                Aprende con Nosotros
              </a>
            </li>
            <li>
              <a
                href="https://forms.gle/1ikdLuJwynouEshV9"
                target="_blank"
                rel="noopener noreferrer"
                className="submenu-link"
                onClick={handleLinkClick}
              >
                Trabaje con nosotros
              </a>
            </li>
            <li>
              <a 
                href="/cuotas-copagos"
                className="submenu-link"
                onClick={handleLinkClick}
              >
                Cuotas y Copagos
              </a>
            </li>
          </ul>
        </li>
        
        <li>
          <a 
            href="/programas"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Programas
          </a>
        </li>
        
        <li className="nav-cta">
          <a 
            href="/contacto"
            className="cta-button"
            onClick={handleLinkClick}
          >
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
}