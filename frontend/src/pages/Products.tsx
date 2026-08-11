import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES as STATIC_CATEGORIES } from '../data/brochureData';

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  categories: { name: string } | null;
  product_images?: { image_url: string }[];
}

// Convert static products to the same shape as DB products
const staticAsDbProducts: DbProduct[] = STATIC_PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  description: p.description,
  categories: { name: p.category },
  product_images: [{ image_url: p.image }],
}));

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const [apiProducts, setApiProducts] = useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setApiProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products from API:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Merge: API products take priority; static products fill in any not in the API
  const apiSlugs = new Set(apiProducts.map(p => p.slug));
  const mergedProducts = [
    ...apiProducts,
    ...staticAsDbProducts.filter(p => !apiSlugs.has(p.slug)),
  ];

  // Build a unified category list from static categories
  const allCategories = STATIC_CATEGORIES.map(c => ({ id: c.slug, name: c.name, slug: c.slug }));

  const filteredProducts = mergedProducts.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.categories?.name === allCategories.find(c => c.slug === activeCategory)?.name;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative bg-dark text-white pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden rounded-b-[3rem] mb-8 md:mb-12 shadow-2xl">
        <div className="absolute inset-0">
          <img src="/brochure-images/products_engineer_bg.png" alt="SmartGrit Products" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -30, rotateX: 15, z: -50 }} animate={{ opacity: 1, x: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.4, type: "spring", bounce: 0.4 }} className="max-w-3xl" style={{ transformStyle: "preserve-3d" }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/20 border border-primary/50 text-primary text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              SmartGrit Product Range
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-wider mb-6 drop-shadow-2xl leading-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">Products</span></h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium drop-shadow-lg max-w-2xl">
              Discover industry-leading grinding & polishing tools. Engineered in India for perfection.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-12 items-center">
          {/* Search */}
          <div className="relative w-full lg:w-1/3 group">
            <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-2xl pl-12 sm:pl-16 pr-4 sm:pr-6 py-3.5 sm:py-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-dark placeholder-gray-400 text-base sm:text-lg font-medium relative"
            />
          </div>

          {/* Category tabs */}
          <div className="flex w-full lg:w-2/3 gap-3 items-center bg-white p-2 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border-2 border-gray-100 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchParams({});
              }}
              className={`whitespace-nowrap flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === 'all' ? 'bg-dark text-primary shadow-lg' : 'bg-transparent text-gray-500 hover:text-dark hover:bg-gray-50'}`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.slug);
                  setSearchParams({ category: cat.slug });
                }}
                className={`whitespace-nowrap flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat.slug ? 'bg-dark text-primary shadow-lg' : 'bg-transparent text-gray-500 hover:text-dark hover:bg-gray-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">Loading products...</p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-6 perspective-[2000px]">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, rotateX: -15, z: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.08, rotateX: 12, rotateY: -12, z: 40 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.3, delay: idx * 0.03, type: "spring", stiffness: 100 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] group md:hover:border-primary/30 md:hover:shadow-[0_40px_70px_-20px_rgba(0,0,0,0.2)] transition-all duration-500 flex flex-col overflow-hidden relative transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 md:group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>

                <Link to={`/products/${product.slug}`} className="relative overflow-hidden bg-white h-56 sm:h-64 flex items-center justify-center p-6 border-b border-gray-50">
                  <img
                    src={product.product_images?.[0]?.image_url || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-dark text-[10px] sm:text-xs font-black px-3 py-1.5 uppercase rounded-lg shadow-md border border-gray-100 filter drop-shadow-sm z-20">
                    {product.categories?.name || 'Uncategorized'}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative z-20 bg-white">
                  <h3 className="font-extrabold text-dark text-lg leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {product.description}
                  </p>

                  <div className="flex gap-3 mt-auto">
                    <Link
                      to={`/products/${product.slug}`}
                      className="w-full rounded-xl border-2 border-gray-200 text-dark text-sm font-bold py-3 text-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-1"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
