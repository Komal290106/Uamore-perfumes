import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Twitter, Facebook } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { Button } from './Button';

export const Footer = () => {
  const { isConnected, connectWallet } = useWallet();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-rose-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                Uamore
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Luxury perfumes crafted for the modern world. Experience elegance in every drop.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-rose-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-rose-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-rose-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-rose-400 transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-rose-400 transition-colors text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-rose-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Connect</h3>
            <div className="flex space-x-3 mb-4">
              <a
                href="#"
                className="p-2 bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-400 rounded-lg transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-400 rounded-lg transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-400 rounded-lg transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            {!isConnected && (
              <Button onClick={connectWallet} variant="outline" size="sm" className="w-full">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Uamore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
