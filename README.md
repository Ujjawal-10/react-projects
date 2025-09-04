# Keyword Analyzer

A React-based keyword analysis tool that helps analyze keyword volume and SEO metrics using **Google SerpApi** and **Google Trends API**.  
The application provides charts and related keywords to support SEO research and competitor analysis.

---

## Features

- Keyword trends visualization with interactive charts.  
- Related keywords discovery.  
- Search volume and SEO metrics analysis.  
- Responsive and modern user interface.  
- Data fetching and caching with React Query.  

---

## Tech Stack

- React  
- Tailwind CSS  
- React Query  
- Material UI (MUI)  
- Lucide Icons  
- SerpApi (Google)  
- Google Trends API  

---

## Project Structure

```
keywordAnalyser
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── api                # API calls and services
│   │   └── serpApi.js
│   │   └── trendsApi.js
│   ├── components         # Reusable UI components
│   │   └── Chart.js
│   │   └── KeywordList.js
│   │   └── SearchBar.js
│   ├── hooks              # Custom React hooks
│   │   └── useKeywords.js
│   │   └── useTrends.js
│   ├── pages              # Application pages/views
│   │   └── Home.js
│   │   └── Results.js
│   ├── styles             # Tailwind and custom CSS
│   │   └── index.css
│   ├── utils              # Utility functions
│   │   └── helpers.js
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── routes.js          # App routing
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation

```
