import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Applications from './pages/Applications';
import Contact from './pages/Contact';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminSettings from './pages/AdminSettings';
import AdminQuotes from './pages/AdminQuotes';
import AdminCustomers from './pages/AdminCustomers';
import AdminGallery from './pages/AdminGallery';

function App() {
  return (
    <>
      <SplashScreen />
      <Router>
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="applications" element={<Applications />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
