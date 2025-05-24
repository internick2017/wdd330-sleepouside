# ⛺ SleepOutside - Outdoor Gear E-commerce

## WDD 330 - Web Frontend Development II

This repository contains the SleepOutside web application project for WDD 330, an e-commerce platform for outdoor gear. The project is built with modern JavaScript (ES6+ modules) and follows best practices for frontend development, including dynamic content rendering and state management.

## 🆕 Latest Updates (v1.2.0)

- **Product Catalog**: Implemented dynamic product listing with category filtering
- **Product Details**: Added detailed product pages with image galleries
- **API Integration**: Connected to external API for product data
- **Responsive Images**: Optimized image loading with responsive image handling
- **Performance**: Improved loading performance with lazy loading
- **Error Handling**: Enhanced error handling and user feedback

## 📋 Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wdd330-sleepouside.git
   cd wdd330-sleepouside
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API URL:
   ```
   VITE_SERVER_URL=https://wdd330-backend.onrender.com/
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🌐 API Integration

The application uses the following API endpoints:
- `GET /products/search/{category}` - Get products by category
- `GET /product/{id}` - Get product details by ID

## 🛠️ Project Structure

```
src/
├── cart/                   # Shopping cart functionality
│   ├── cart.js             # Cart page logic
│   ├── cart.css            # Cart page styles
│   └── checkout.js         # Checkout process
├── css/                    # Global stylesheets
├── js/                     # JavaScript modules
│   ├── ShoppingCart.mjs    # Shopping cart module
│   ├── ProductData.mjs     # Product data fetching and management
│   ├── ProductList.mjs     # Product listing component
│   ├── main.js             # Main application logic
│   └── utils.mjs           # Utility functions
├── product_listing/        # Product listing pages
│   ├── index.html          # Product listing template
│   └── product-listing.js  # Listing page logic
├── product_pages/          # Individual product pages
│   ├── index.html          # Product detail template
│   └── productDetail.js    # Product detail logic
├── public/                 # Static assets
│   └── partials/           # Reusable HTML partials
│       ├── header.html     # Site header
│       └── footer.html     # Site footer
└── test/               # Test files
```

## 📝 Features

- **Product Catalog**: Browse products by category with filtering
- **Product Details**: View detailed product information with image galleries
- **Shopping Cart**: Add/remove items, update quantities
- **Responsive Design**: Mobile-first approach with responsive images
- **Modern JavaScript**: Built with ES6+ modules and modern APIs
- **Performance Optimized**: Lazy loading and efficient rendering

## 📝 Available Scripts

- `npm start` - Start the development server with hot-reload
- `npm run build` - Build the application for production (outputs to `/dist`)
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run format` - Format code using Prettier
- `npm test` - Run tests with Jest

## 📚 Dependencies

- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏗️ Project Architecture

- **Modular JavaScript** using ES6 modules
- **Template-based rendering** for dynamic content
- **Component-based** architecture
- **Responsive design** with mobile-first approach
- **State management** using local storage

## 🧪 Testing

Run the test suite with:
```bash
npm test
```

## 🌐 Production

Production URL: [SleepOutside Live Demo](https://bejewelled-centaur-2cb23d.netlify.app/)

## 👥 Team Collaboration

### Branching Strategy
- `main` - Production-ready code
- `feature/*` - New features and improvements
- `bugfix/*` - Bug fixes and patches

### Code Review Process
1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Push your branch and create a Pull Request (PR)
4. Request review from at least one team member
5. After approval, merge into `main`
6. Delete the feature branch after merge

## 📚 Resources

- [WDD 330 Course Materials](https://byui-cse.github.io/wdd330-ww-course/)
- [Vite Documentation](https://vitejs.dev/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)

---

_BYU-Pathway Worldwide improves lives through access to spiritually based, online affordable higher education. Its mission is to develop disciples of Jesus Christ who are leaders in their homes, the Church, and their communities._

