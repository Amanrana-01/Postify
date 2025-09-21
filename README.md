<<<<<<< HEAD
# Blog Platform

A modern, full-stack blog platform built with Next.js 15, PayloadCMS, and TypeScript. Features a beautiful, responsive design with dark mode support, SEO optimization, and a powerful content management system.

## 🚀 Features

### Frontend (Next.js 15)
- ✅ **Modern Next.js 15** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode Support** - Automatic theme detection
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ✅ **Performance Optimized** - Image optimization, caching, lazy loading
- ✅ **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Loading States** - Skeleton loaders and smooth transitions
- ✅ **Search Functionality** - Real-time search with URL state
- ✅ **Category Filtering** - Dynamic category-based filtering

### Backend (PayloadCMS)
- ✅ **Headless CMS** - Content management without constraints
- ✅ **Rich Text Editor** - Lexical editor with advanced features
- ✅ **Media Management** - Image uploads with automatic optimization
- ✅ **User Management** - Role-based access control
- ✅ **SEO Plugin** - Built-in SEO management
- ✅ **Search Plugin** - Full-text search capabilities
- ✅ **Form Builder** - Dynamic form creation
- ✅ **Version Control** - Draft and publish workflow
- ✅ **API-First** - RESTful and GraphQL APIs

## 🏗️ Project Structure

```
payload/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages and components
│   │   │   ├── Components/  # Reusable UI components
│   │   │   ├── api/         # API routes
│   │   │   ├── globals.css  # Global styles
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── page.tsx     # Home page
│   │   ├── blog/            # Blog-specific pages
│   │   └── lib/             # Utility functions and API client
│   ├── next.config.ts       # Next.js configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── package.json         # Frontend dependencies
├── payloadcms/              # PayloadCMS backend
│   ├── src/
│   │   ├── collections/     # Content collections
│   │   ├── components/      # PayloadCMS components
│   │   ├── blocks/          # Content blocks
│   │   └── payload.config.ts
│   └── package.json         # Backend dependencies
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **PayloadCMS 3.56** - Headless CMS
- **MongoDB** - Database
- **Sharp** - Image processing
- **Lexical** - Rich text editor
- **GraphQL** - Query language

## 🚀 Getting Started

### Prerequisites
- Node.js 18.20.2 or higher
- pnpm (recommended) or npm
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd payload
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   pnpm install

   # Install backend dependencies
   cd ../payloadcms
   pnpm install
   ```

3. **Environment Setup**
   
   Create `.env.local` in the frontend directory:
   ```env
   PAYLOAD_API=your_payload_api_key_here
   PAYLOAD_URL=http://localhost:3001
   NEXT_PUBLIC_PAYLOAD_API=your_payload_api_key_here
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
   ```

   Create `.env` in the payloadcms directory:
   ```env
   DATABASE_URI=mongodb://localhost:27017/blog-platform
   PAYLOAD_SECRET=your-secret-key-here
   ```

4. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd payloadcms
   pnpm dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   pnpm dev
   ```

5. **Access the applications**
   - Frontend: http://localhost:3000
   - PayloadCMS Admin: http://localhost:3001/admin

## 📝 Usage

### Content Management
1. Access the PayloadCMS admin panel at `http://localhost:3001/admin`
2. Create categories for organizing your blog posts
3. Create and publish blog posts with rich content
4. Upload and manage media files
5. Configure SEO settings for each post

### Frontend Features
- **Home Page**: Displays latest blog posts and categories
- **Blog Post Page**: Individual post view with full content
- **Search**: Real-time search functionality
- **Categories**: Filter posts by category
- **Responsive Design**: Works on all device sizes
- **Dark Mode**: Automatic theme switching

## 🔧 Configuration

### Next.js Configuration
The frontend is configured with:
- Image optimization for PayloadCMS media
- Security headers
- Package optimization
- TypeScript strict mode

### PayloadCMS Configuration
The backend includes:
- MongoDB adapter
- Rich text editor with Lexical
- SEO plugin
- Search plugin
- Form builder
- Media collections

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Render)
1. Connect your repository
2. Set environment variables
3. Deploy with automatic builds

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update `DATABASE_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [PayloadCMS](https://payloadcms.com/) for the powerful headless CMS
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for the deployment platform

## 📞 Support

If you have any questions or need help, please:
1. Check the [documentation](https://payloadcms.com/docs)
2. Open an [issue](https://github.com/your-repo/issues)
3. Contact the maintainers

---

**Happy Blogging! 🎉**

=======
# Postify
A blog website built with Next.js frontend and Payload CMS backend. Blogs are fetched dynamically from Payload and displayed with a clean, responsive UI. Features include server-side rendering, smooth content management, and scalability for future improvements.

📌 Project Description

This project is a blog website built with Next.js for the frontend and Payload CMS as the backend. It allows fetching and displaying blogs dynamically from Payload, ensuring a smooth content management experience.

🔹 Features

🚀 Modern frontend built with Next.js

📝 Blogs managed and fetched via Payload CMS

🎨 Responsive and clean UI for better readability

🔄 Dynamic blog rendering

⚡ Optimized performance with server-side rendering (SSR)

🔧 Tech Stack

Frontend: Next.js, React, TailwindCSS

Backend/CMS: Payload CMS

Deployment: (Vercel/Netlify/Custom server – mention your choice)

📂 Project Structure

frontend/ → Next.js app for UI

payload/ → Payload CMS setup

🎯 Future Improvements

Add user authentication for blog posting

Implement categories & tags

Enable search functionality
>>>>>>> 290bdde793aeb964cca9297c603b425f84b2a020
