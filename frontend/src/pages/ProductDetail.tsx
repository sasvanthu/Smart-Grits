import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  categories: { name: string } | null;
  product_images?: { image_url: string; is_primary: boolean }[];
}

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<DbProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-dark mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you are looking for does not exist.</p>
        <Link to="/products" className="bg-primary text-white px-6 py-3 font-semibold hover:bg-green-600 transition-colors">
          Back to Products
        </Link>
      </div>
    );
  }

  // Use product_images if available
  const images = product.product_images && product.product_images.length > 0
    ? product.product_images.map(img => img.image_url)
    : ['/placeholder.png'];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-dark font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="bg-gray-50 border border-gray-100 overflow-hidden mb-4 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800';
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-24 border-2 overflow-hidden rounded-xl transition-all duration-300 ${activeImage === idx ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=200'; }} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 flex flex-col pt-4">
            <div className="inline-flex items-center text-xs font-black text-primary uppercase tracking-widest mb-4 bg-primary/10 px-4 py-2 rounded-lg">
              {product.categories?.name || 'Uncategorized'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-dark uppercase mb-6 leading-tight tracking-wider">{product.name}</h1>
            
            <div className="w-16 h-1 bg-primary mb-6"></div>

            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-dark mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col gap-4 mb-10">
              <Link
                to="/contact"
                className="w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:-translate-y-1 bg-dark text-white hover:bg-primary hover:shadow-primary/30"
              >
                <Mail className="w-6 h-6" />
                Inquire About This Product
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
