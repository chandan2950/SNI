# InsureBazaar - Insurance Comparison Platform

A modern insurance comparison and marketplace platform built with the MERN stack, inspired by PolicyBazaar.

## 🚀 Features

- **Insurance Product Browsing** - Browse and filter insurance products by category
- **User Authentication** - Secure JWT-based authentication with role-based access
- **Product Comparison** - Compare multiple insurance plans side by side
- **Enquiry System** - Submit and track insurance enquiries
- **Customer Testimonials** - Display customer reviews and ratings
- **Learning Center** - Educational resources for both customers and agents
- **Responsive Design** - Mobile-first design with modern UI/UX

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.3
- **Redux Toolkit** 2.11.2 - State management
- **React Router DOM** 7.12.0 - Routing
- **Axios** 1.13.2 - HTTP client
- **Tailwind CSS** - Styling

### Backend
- **Node.js** with **Express** 5.2.1
- **MongoDB** with **Mongoose** 9.1.2
- **JWT** - Authentication (jsonwebtoken 9.0.3)
- **Bcrypt** - Password hashing (bcryptjs 3.0.3)
- **Nodemailer** 7.0.12 - Email service

## 📁 Project Structure

```
TestProj/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── services/      # API services
│   │   └── utils/         # Utilities and helpers
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utilities
│   └── server.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TestProj
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   Server runs on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```
   Frontend runs on http://localhost:3000

## 🎨 Key Features & Pages

### Pages
- **Home** - Landing page with insurance categories and featured products
- **About** - Company information and mission
- **Products** - Browse and filter insurance products
- **Login/Register** - User authentication
- **Learning Centers** - Resources for customers and agents

### Components
- Navbar with authentication state
- Footer with company links
- Insurance category cards
- Product cards with enquiry functionality
- Testimonial cards
- Enquiry form with validation
- Protected routes for authenticated users

## 🔐 User Roles

- **Customer** - Browse and purchase insurance
- **Insurance Partner** - Manage partner offerings
- **Employee** - Internal operations
- **Management** - Admin access

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product details

### Enquiries
- `POST /api/enquiries` - Submit enquiry
- `GET /api/enquiries/my-enquiries` - Get user enquiries
- `GET /api/enquiries` - Get all enquiries (admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/active` - Get active testimonials

## 🎯 Insurance Categories

- Term Life Insurance
- Health Insurance
- Investment Plans
- Car Insurance
- Bike Insurance
- Family Health Insurance
- Travel Insurance
- Home Insurance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👥 Contact

For any queries, reach out to:
- Email: support@insurebazaar.com
- Phone: 1800-123-4567

---

**Built with ❤️ using MERN Stack**
