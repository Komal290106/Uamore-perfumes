import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Wallet } from 'lucide-react';
import { products } from '../data/mockData';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useCart } from '../contexts/CartContext';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';

export const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isConnected, connectWallet, chainId, switchNetwork } = useWallet();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'ETH' | 'MATIC'>('ETH');
  const [processing, setProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleCryptoPayment = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    const targetChainId = selectedCurrency === 'ETH' ? 1 : 137;
    if (chainId !== targetChainId) {
      try {
        await switchNetwork(targetChainId);
      } catch (error) {
        alert('Please switch to the correct network in your wallet');
        return;
      }
    }

    setProcessing(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const recipientAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(product.ethPrice.toString()),
      });

      await tx.wait();
      setTransactionHash(tx.hash);
      alert('Payment successful! Your order has been placed.');
      setShowPaymentModal(false);
    } catch (error: any) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-rose-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 space-y-4">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                <span className="text-xl text-gray-500">{product.ethPrice} ETH</span>
              </div>
              <p className="text-sm text-green-600 font-medium">In Stock</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Fragrance Notes</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-600 w-20">Top:</span>
                  <span className="text-sm text-gray-700">{product.fragranceNotes.top.join(', ')}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-600 w-20">Middle:</span>
                  <span className="text-sm text-gray-700">{product.fragranceNotes.middle.join(', ')}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-600 w-20">Base:</span>
                  <span className="text-sm text-gray-700">{product.fragranceNotes.base.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => {
                  addToCart(product);
                  alert('Added to cart!');
                }}
                size="lg"
                className="flex-1 group"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => setShowPaymentModal(true)}
                variant="secondary"
                size="lg"
                className="flex-1 group"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Pay with Crypto
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">Crypto Payments Accepted</p>
              <p>Pay securely with Ethereum or Polygon. Connect your wallet to get started.</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Complete Payment"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Currency
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedCurrency('ETH')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedCurrency === 'ETH'
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-800">Ethereum</p>
                <p className="text-sm text-gray-600">{product.ethPrice} ETH</p>
              </button>
              <button
                onClick={() => setSelectedCurrency('MATIC')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedCurrency === 'MATIC'
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-800">Polygon</p>
                <p className="text-sm text-gray-600">{(product.ethPrice * 1800).toFixed(0)} MATIC</p>
              </button>
            </div>
          </div>

          {!isConnected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
              Please connect your wallet to continue with the payment.
            </div>
          )}

          {transactionHash && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
              <p className="font-medium mb-1">Payment Successful!</p>
              <p className="break-all">Transaction: {transactionHash}</p>
            </div>
          )}

          <Button
            onClick={handleCryptoPayment}
            disabled={processing}
            size="lg"
            className="w-full"
          >
            {processing ? 'Processing...' : isConnected ? 'Complete Payment' : 'Connect Wallet'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
