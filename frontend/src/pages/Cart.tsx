import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      companyName: formData.get('companyName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      remarks: formData.get('remarks'),
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote');
      }

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Failed to submit your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold text-dark mb-4">Thank you.</h2>
        <p className="text-gray-600 text-lg mb-8">
          Your order has been successfully placed. Our team will contact you shortly to confirm the details.
        </p>
        <Link to="/products" className="inline-block bg-primary text-white px-8 py-3 font-semibold hover:bg-green-600 transition-colors">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-dark uppercase tracking-wider mb-4">Shopping Cart</h1>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-green-300 rounded-full mb-8"></div>
        </div>

        {totalItems === 0 ? (
          <motion.div initial={{ opacity: 0, y: 50, rotateX: 20, z: -100 }} animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.4 }} className="bg-white p-16 text-center rounded-[3rem] border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] max-w-3xl mx-auto transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <h3 className="text-3xl font-black text-dark mb-4 uppercase tracking-wider">Your cart is empty</h3>
            <p className="text-gray-500 mb-10 text-lg">Add products to your cart to place an order.</p>
            <Link to="/products" className="inline-block bg-dark text-white px-10 py-5 font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:shadow-[0_10px_20px_-10px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all duration-300">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -30, rotateY: 15, z: -50 }} animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.8, type: "spring" }} className="lg:col-span-2 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
              <div className="bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h2 className="text-xl font-black uppercase tracking-wider text-dark">Selected Products ({totalItems})</h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-8 flex flex-col sm:flex-row items-center gap-8 group hover:bg-gray-50/50 transition-colors">
                      <img src={item.product.image} alt={item.product.name} className="w-32 h-32 object-cover bg-gray-100 rounded-2xl shadow-sm" />
                      <div className="flex-1">
                        <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">{item.product.category}</div>
                        <h3 className="text-xl font-black text-dark uppercase tracking-wide leading-tight">{item.product.name}</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                          <button 
                            className="px-4 py-2 hover:bg-white transition-colors text-dark font-bold"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >-</button>
                          <span className="w-12 text-center border-x border-gray-200 py-2 font-bold bg-white text-dark">{item.quantity}</span>
                          <button 
                            className="px-4 py-2 hover:bg-white transition-colors text-dark font-bold"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30, rotateY: -15, z: -50 }} animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.8, type: "spring" }} className="lg:col-span-1 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
              <div className="bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden lg:sticky lg:top-32">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-xl font-black uppercase tracking-wider text-dark">Checkout</h2>
                </div>
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Full Name *</label>
                      <input required type="text" name="fullName" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Company Name *</label>
                      <input required type="text" name="companyName" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Email Address *</label>
                      <input required type="email" name="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Phone Number *</label>
                      <input required type="tel" name="phone" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Remarks</label>
                      <textarea rows={3} name="remarks" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark font-medium"></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-green-600 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 mt-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                      {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
