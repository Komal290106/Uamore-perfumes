import { Sparkles, Heart, Globe, Award } from 'lucide-react';
import { Card } from '../components/Card';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Uamore</h1>
            <p className="text-xl text-gray-600">
              Crafting luxury fragrances for the modern world
            </p>
          </div>

          <Card className="p-8 md:p-12 mb-12">
            <img
              src="https://m.media-amazon.com/images/I/71x6lI0hNqL._UF350,350_QL80_.jpg"
              alt="Luxury Perfumes"
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            />

            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with a passion for exceptional fragrances, Uamore represents the perfect fusion of traditional
                perfumery craftsmanship and modern innovation. Our name, derived from the word "amore" meaning love,
                reflects our deep commitment to creating scents that evoke emotion and lasting memories.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Each fragrance in our collection is meticulously crafted using the finest ingredients sourced from
                around the world. From Bulgarian roses to rare oud wood, we spare no effort in selecting only the
                most exceptional materials for our perfumes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As pioneers in the luxury fragrance industry, we're proud to embrace Web3 technology, offering our
                customers the convenience and security of cryptocurrency payments while maintaining the timeless
                elegance that defines our brand.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 text-center" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Only the finest ingredients and most skilled artisans create our signature scents.
              </p>
            </Card>

            <Card className="p-6 text-center" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Passion Driven</h3>
              <p className="text-gray-600">
                Every bottle is created with love and dedication to the art of perfumery.
              </p>
            </Card>

            <Card className="p-6 text-center" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Global Sourcing</h3>
              <p className="text-gray-600">
                We source rare ingredients from the most renowned regions worldwide.
              </p>
            </Card>

            <Card className="p-6 text-center" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Award Winning</h3>
              <p className="text-gray-600">
                Recognized internationally for excellence in luxury fragrance creation.
              </p>
            </Card>
          </div>

          <Card className="p-8 md:p-12 bg-gradient-to-r from-rose-50 via-pink-50 to-blue-50">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To redefine luxury perfumery by combining timeless elegance with cutting-edge technology,
                making exceptional fragrances accessible to discerning customers worldwide through innovative
                payment solutions and uncompromising quality.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
