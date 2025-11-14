import { useState } from 'react';
import MobileMenuToggle from './MobileMenuToggle';
import Navigation from './Navigation';

export default function HeaderNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="right-container">
      <MobileMenuToggle onToggle={handleToggle} />
      <Navigation isOpen={isMenuOpen} onClose={handleClose} />
    </div>
  );
}