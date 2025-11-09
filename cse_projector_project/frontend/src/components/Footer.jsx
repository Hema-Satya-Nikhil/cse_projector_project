import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} SRINIVASA INSTITUTE OF ENGINEERING AND TECHNOLOGY
            </p>
            <p className="text-xs text-gray-500">
              SMART PROJECTOR MANAGER
            </p>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Developed with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by</span>
            <span className="font-semibold text-primary">Nikhil & Varshini</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Digital Projector Tracking & Management System — SRINIVASA INSTITUTE OF ENGINEERING AND TECHNOLOGY
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
