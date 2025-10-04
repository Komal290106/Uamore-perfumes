import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWallet } from '../contexts/WalletContext';
import { Button } from './Button';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isConnected, account, connectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <Sparkles className="w-8 h-8 text-rose-400 group-hover:text-rose-500 transition-colors" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              Uamore
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-rose-400 transition-colors font-medium">
              Home
            </Link>
            {/* <Link to="/products" className="text-gray-700 hover:text-rose-400 transition-colors font-medium">
              Products
            </Link> */}
            <Link to="/about" className="text-gray-700 hover:text-rose-400 transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-rose-400 transition-colors font-medium">
              Contact
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-rose-400 transition-colors font-medium">
              FAQ
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="hidden md:block px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                {formatAddress(account!)}
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                variant="outline"
                size="sm"
                className="hidden md:block"
              >
                Connect Wallet
              </Button>
            )}

            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-rose-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-rose-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-rose-400 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-rose-400 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-rose-400 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-rose-400 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              {!isConnected && (
                <Button onClick={connectWallet} variant="outline" size="sm">
                  Connect Wallet
                </Button>
              )}
              {isConnected && (
                <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-lg text-sm font-medium border border-green-200 text-center">
                  {formatAddress(account!)}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
