# Blog Project Frontend

A modern blog application frontend built with React and Vite, featuring a clean and responsive design for content management and reading experience.

## 🚀 Features

- Modern React application with Vite for fast development
- Responsive design for optimal viewing on all devices
- Blog post creation, editing, and management
- Clean and intuitive user interface
- Fast build times and hot module replacement (HMR)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript/TypeScript
- **Styling**: CSS/SCSS (or your preferred styling solution)
- **Linting**: ESLint

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Blog_Project_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
Blog_Project_Frontend/
├── public/          # Static assets
├── src/            # Source code
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── hooks/      # Custom hooks
│   ├── utils/      # Utility functions
│   └── styles/     # Styling files
├── package.json    # Dependencies and scripts
└── vite.config.js  # Vite configuration
```

## 🔧 Configuration

This project uses Vite with the following plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Alternative using SWC for Fast Refresh
