# 🎬 Netflix GPT

A modern Netflix clone with AI-powered movie recommendations built with React, Vite, and TMDB API.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![TMDB](https://img.shields.io/badge/TMDB-API-01D277)

## ✨ Features

- 🎥 **Browse Movies** - Now Playing, Trending, Popular, Top Rated
- 🔍 **Search Functionality** - Find any movie instantly
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Netflix-like UI** - Modern and sleek interface
- 🚀 **Fast Performance** - Built with Vite for lightning-fast HMR
- 🔐 **Authentication Ready** - Firebase integration (coming soon)
- 🤖 **GPT Integration** - AI-powered recommendations (coming soon)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key (free)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NikhilAtyali/netflix-gpt.git
cd netflix-gpt
```

2. **Install dependencies**
```bash
npm install
```

3. **Get TMDB API Key**
   - Sign up at [TMDB](https://www.themoviedb.org/signup)
   - Go to Settings → API → Request API Key
   - Choose "Developer" option

4. **Add your API key**
   - Open `src/utils/constants.js`
   - Replace `YOUR_API_KEY_HERE` with your actual TMDB API key

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start browsing movies! 🎉

## 📁 Project Structure

```
netflix-gpt/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Browse.jsx          # Main browse page
│   │   ├── MovieRow.jsx        # Horizontal movie row
│   │   ├── MovieList.jsx       # Movie grid view
│   │   └── Body.jsx            # Body component
│   ├── utils/
│   │   ├── constants.js        # API configuration
│   │   ├── tmdbApi.js          # API service functions
│   │   └── validate.js         # Form validation
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── API_SETUP_GUIDE.md         # Detailed API documentation
├── QUICK_START.md             # Quick setup guide
└── package.json               # Dependencies

```

## 🎯 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.1
- **API**: TMDB (The Movie Database)
- **Linting**: ESLint

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started in 5 minutes
- **[API Setup Guide](API_SETUP_GUIDE.md)** - Complete TMDB API documentation

## 🎬 API Features

The app uses TMDB API to fetch:
- Now Playing movies
- Trending movies (daily)
- Popular movies
- Top Rated movies
- Movie details, trailers, and cast
- Search functionality
- Genre-based filtering

## 🔐 Environment Variables

Create a `.env` file (optional):
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

## 🚧 Roadmap

- [x] Basic movie browsing
- [x] TMDB API integration
- [x] Responsive design
- [ ] Firebase authentication
- [ ] Movie detail pages
- [ ] GPT-powered search
- [ ] Watchlist feature
- [ ] User profiles
- [ ] Movie trailers
- [ ] Recommendations engine

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Nikhil Atyali**
- GitHub: [@NikhilAtyali](https://github.com/NikhilAtyali)

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the amazing movie database API
- [Netflix](https://www.netflix.com/) for design inspiration
- React and Vite teams for excellent tools

---

**⭐ Star this repo if you find it helpful!**
