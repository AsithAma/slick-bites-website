# Slick Bites Restaurant Website

A modern, responsive restaurant website built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean and professional design with smooth animations
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Menu**: Beautiful menu presentation with filtering options
- **Reservation System**: Easy-to-use booking functionality
- **Gallery**: Showcase your restaurant's atmosphere and dishes
- **Contact Information**: Integrated maps and contact details
- **Admin Panel**: Manage reservations and content

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Lucide React** - Beautiful icons
- **EmailJS** - Email functionality

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd slick-bites-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Hero section
│   ├── MenuSection.tsx # Menu display
│   ├── Reservation.tsx # Booking form
│   └── ...
├── pages/              # Page components
├── services/           # API and service functions
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Customization

### Styling
The project uses Tailwind CSS for styling. You can customize colors, fonts, and other design tokens in `tailwind.config.ts`.

### Content
Update the content in the component files to match your restaurant's information, menu items, and branding.

### Images
Replace placeholder images in the `public/` directory with your restaurant's photos.

## Deployment

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

### Other Platforms
The project builds to static files in the `dist/` directory, making it compatible with any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
