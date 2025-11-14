import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  onToggle: (isOpen: boolean) => void;
}

export default function MobileMenuToggle({ onToggle }: MobileMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  // Cerrar menú cuando se hace clic fuera o se cambia el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1080 && isOpen) {
        setIsOpen(false);
        onToggle(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const clickedDropdown = target.closest('.dropdown');
      const clickedToggle = target.closest('.menu-toggle-button');
      const clickedMenu = target.closest('.nav-menu');
      
      if (!clickedDropdown && !clickedToggle && !clickedMenu && isOpen) {
        setIsOpen(false);
        onToggle(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="menu-toggle-button"
      onClick={handleToggle}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      style={{
        position: 'relative',
        zIndex: 1002,
        padding: '10px',
        marginRight: '12px',
        backgroundColor: 'transparent',
        border: 'none',
        height: '42px',
        width: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ 
        width: '22px', 
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Icono de hamburguesa */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) ${isOpen ? 'rotate(45deg) scale(0.8)' : 'rotate(0deg) scale(1)'}`,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isOpen ? 0 : 1
        }}>
          <Menu style={{ width: '30px', height: '30px', color: '#374151' }} />
        </div>
        {/* Icono de X */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) ${isOpen ? 'rotate(0deg) scale(1)' : 'rotate(-45deg) scale(0.8)'}`,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isOpen ? 1 : 0
        }}>
          <X style={{ width: '30px', height: '30px', color: '#374151' }} />
        </div>
      </div>
    </Button>
  );
}