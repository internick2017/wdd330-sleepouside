# ⛺ SleepOutside - Outdoor Gear E-commerce

## WDD 330 - Web Frontend Development II

This repository contains the SleepOutside web application project for WDD 330, an e-commerce platform for outdoor gear. The project is built with modern JavaScript (ES6+ modules) and follows best practices for frontend development, including dynamic content rendering and state management.

## 🆕 Latest Updates (v1.1.0)

- **Dynamic Header/Footer**: Implemented reusable header and footer components
- **Shopping Cart**: Added a fully functional shopping cart with template-based rendering
- **Code Organization**: Improved project structure with better module separation
- **Responsive Design**: Enhanced mobile-first styling for all components

## 📋 Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd wdd330-sleepouside
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```
   The application will be available at `http://localhost:5173`

## 🛠️ Project Structure

```
src/
├── cart/               # Shopping cart functionality
│   ├── cart.js         # Cart page logic
│   ├── cart.css        # Cart page styles
│   └── checkout.js     # Checkout process
├── css/                # Global stylesheets
├── js/                 # JavaScript modules
│   ├── ShoppingCart.mjs # Shopping cart module
│   ├── main.js         # Main application logic
│   └── utils.mjs       # Utility functions
├── json/               # Data files
├── partials/           # HTML templates
│   └── cart-item.html  # Cart item template
├── product_pages/      # Product listing and details
├── public/             # Static assets
│   └── partials/       # Reusable HTML partials
│       ├── header.html # Site header
│       └── footer.html # Site footer
└── test/               # Test files
```

## 📝 Available Scripts

- `npm start` - Start the development server with hot-reload
- `npm run build` - Build the application for production (outputs to `/dist`)
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run format` - Format code using Prettier
- `npm test` - Run tests with Jest

## 🛒 Shopping Cart Features

- Add/remove items from cart
- Update item quantities
- Dynamic cart total calculation
- Persistent cart state (using localStorage)
- Responsive design for all screen sizes
- Template-based rendering for cart items

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

