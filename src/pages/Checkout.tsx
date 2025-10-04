import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Wallet } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWallet } from '../contexts/WalletContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { ethers } from 'ethers';

export const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isConnected, account, connectWallet, chainId, switchNetwork } = useWallet();
  const navigate = useNavigate();

  const [selectedCurrency, setSelectedCurrency] = useState<'ETH' | 'MATIC'>('ETH');
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const totalEth = items.reduce((sum, item) => sum + item.product.ethPrice * item.quantity, 0);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleCryptoCheckout = async () => {
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
        value: ethers.utils.parseEther(totalEth.toString()),
      });

      await tx.wait();
      setTransactionHash(tx.hash);
      setShowSuccessModal(true);
      clearCart();
    } catch (error: any) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-gray-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{totalEth.toFixed(4)} ETH</p>
              </div>
            </Card>

            {isConnected && account && (
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center space-x-3">
                  <Wallet className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Wallet Connected</p>
                    <p className="text-sm text-green-600">{account.slice(0, 6)}...{account.slice(-4)}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Cryptocurrency
                  </label>
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedCurrency('ETH')}
                      className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                        selectedCurrency === 'ETH'
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">Ethereum</p>
                          <p className="text-sm text-gray-600">{totalEth.toFixed(4)} ETH</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedCurrency === 'ETH' ? 'border-rose-400 bg-rose-400' : 'border-gray-300'
                        }`} />
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedCurrency('MATIC')}
                      className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                        selectedCurrency === 'MATIC'
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">Polygon</p>
                          <p className="text-sm text-gray-600">{(totalEth * 1800).toFixed(0)} MATIC</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedCurrency === 'MATIC' ? 'border-rose-400 bg-rose-400' : 'border-gray-300'
                        }`} />
                      </div>
                    </button>
                  </div>
                </div>

                {!isConnected && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                    <p className="font-medium mb-1">Wallet Required</p>
                    <p>Connect your wallet to complete the purchase with cryptocurrency.</p>
                  </div>
                )}

                <Button
                  onClick={handleCryptoCheckout}
                  disabled={processing}
                  size="lg"
                  className="w-full mt-6"
                >
                  {processing ? 'Processing Payment...' : isConnected ? 'Complete Purchase' : 'Connect Wallet'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/');
        }}
        title="Order Successful"
      >
        <div className="text-center py-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">Your order has been successfully placed.</p>
          {transactionHash && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Transaction Hash</p>
              <p className="text-xs text-gray-800 break-all font-mono">{transactionHash}</p>
            </div>
          )}
          <Button onClick={() => navigate('/')} size="lg" className="w-full">
            Continue Shopping
          </Button>
        </div>
      </Modal>
    </div>
  );
};
