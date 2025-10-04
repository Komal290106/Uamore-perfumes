import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../components/Card';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-800 pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">{answer}</div>
      </div>
    </Card>
  );
};

export const FAQ = () => {
  const faqs = [
    {
      question: 'How do I pay with cryptocurrency?',
      answer: 'Simply connect your MetaMask or compatible Web3 wallet at checkout. Select your preferred cryptocurrency (Ethereum or Polygon), and confirm the transaction. The payment process is secure and seamless.'
    },
    {
      question: 'What cryptocurrencies do you accept?',
      answer: 'We currently accept Ethereum (ETH) on the Ethereum network and MATIC on the Polygon network. More payment options may be added in the future.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unopened products. If you\'re not satisfied with your purchase, contact our customer service team to initiate a return. Please note that due to hygiene reasons, opened fragrances cannot be returned.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within the continental United States. International shipping times vary by location but generally take 7-14 business days. Express shipping options are available at checkout.'
    },
    {
      question: 'Are your perfumes authentic?',
      answer: 'Absolutely. All Uamore fragrances are 100% authentic and crafted in our own facilities using premium ingredients sourced from around the world. Each bottle comes with a certificate of authenticity.'
    },
    {
      question: 'How should I store my perfume?',
      answer: 'Store your perfume in a cool, dry place away from direct sunlight and heat sources. Avoid storing in bathrooms where temperature and humidity fluctuate. Proper storage helps maintain the fragrance\'s quality and longevity.'
    },
    {
      question: 'Do you offer samples?',
      answer: 'We occasionally offer sample sets during special promotions. Subscribe to our newsletter to be notified when sample sets become available. We also offer a satisfaction guarantee on all full-size bottles.'
    },
    {
      question: 'Can I track my cryptocurrency payment?',
      answer: 'Yes! After completing your purchase, you\'ll receive a transaction hash that you can use to track your payment on the blockchain. You can view transaction details on Etherscan or Polygonscan depending on which network you used.'
    },
    {
      question: 'What makes Uamore perfumes special?',
      answer: 'Our perfumes are crafted with rare, high-quality ingredients and exceptional attention to detail. Each fragrance is designed by master perfumers and undergoes rigorous quality testing. We combine traditional perfumery techniques with modern innovation to create truly unique scents.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. International customers are responsible for any customs duties or import taxes that may apply.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="mb-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <Card className="p-8 text-center bg-gradient-to-r from-rose-50 via-pink-50 to-blue-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Please reach out to our customer support team.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-medium rounded-lg hover:from-rose-500 hover:to-pink-500 transition-all shadow-md hover:shadow-lg"
          >
            Contact Support
          </a>
        </Card>
      </div>
    </div>
  );
};
