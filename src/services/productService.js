import productsData from '../data/products.json';

export const productService = {
  getProducts: async () => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(productsData);
        }, 300);
      });
    } catch (error) {
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const data = await productService.getProducts();
      return data.filter(p => p.category.toLowerCase() === category.toLowerCase());
    } catch (error) {
      throw error;
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const data = await productService.getProducts();
      return data.find(p => p.slug === slug);
    } catch (error) {
      throw error;
    }
  }
};