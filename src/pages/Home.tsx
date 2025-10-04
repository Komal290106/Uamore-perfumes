import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useCart } from '../contexts/CartContext';
import { products, testimonials } from '../data/mockData';

export const Home = () => {
  const [email, setEmail] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { addToCart } = useCart();

  const featuredProducts = products.filter((p) => p.featured);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const featuredRef = useRef<HTMLDivElement>(null);


  return (
    <div className="min-h-screen">
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-blue-50">
          <img
            src="https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Luxury Perfume"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Luxury Perfumes
            </span>
            <br />
            <span className="text-gray-800">for the Modern World</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover exquisite fragrances crafted with rare ingredients. Pay seamlessly with cryptocurrency.
          </p>
           {/* Scroll to Featured Section */}
          <Button
            size="lg"
            className="group"
            onClick={() =>
              featuredRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Shop Now
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <section ref={featuredRef} className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked selections that embody elegance and sophistication
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} hover className="group">
                <Link to={`/product/${product.slug}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-rose-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-500">{product.ethPrice} ETH</span>
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Real experiences from real people</p>
          </div>

          <div className="relative">
            <Card className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonials[currentTestimonial].customerImage}
                  alt={testimonials[currentTestimonial].customerName}
                  className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-rose-100"
                />
                <div className="flex mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <p className="font-semibold text-gray-800">
                  {testimonials[currentTestimonial].customerName}
                </p>
              </div>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-rose-50 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-rose-50 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-rose-50 via-pink-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new releases, and fragrance tips
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
            />
            <Button type="submit" size="md">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};
