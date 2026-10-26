# Kirlous Wael — Portfolio Website

A premium, bilingual (English/Arabic) personal developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Premium Editorial Design** — Dark, refined visual identity with strong typography and editorial layouts
- **Bilingual Support** — Full English and Arabic support with correct RTL layouts
- **Admin Panel** — Private content management for projects, services, and site settings
- **No AI Features** — All content is manually authored by the owner
- **Responsive** — Mobile-first design that works beautifully across all devices
- **Accessible** — WCAG 2.2 AA compliance with keyboard navigation and reduced motion support
- **SEO Optimized** — Proper metadata, sitemap, and semantic HTML

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Validation:** Zod
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- A Supabase account (free tier works)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd kirlous-portfolio
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the contents of `supabase-schema.sql`
3. This creates all tables, indexes, RLS policies, and default data

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAILS=your-email@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important:** 
- The `SUPABASE_SERVICE_ROLE_KEY` should never be exposed to the client (no `NEXT_PUBLIC_` prefix)
- `ADMIN_EMAILS` is a comma-separated list of authorized admin emails

### 4. Create Admin Account

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add user** → **Create new user**
4. Enter the email from `ADMIN_EMAILS` and a secure password
5. Make sure "Auto Confirm User" is checked

**Important:** Disable public sign-up in Supabase:
- Go to **Authentication** → **Providers** → **Email**
- Uncheck "Enable Email signup" (keep "Enable Email sign-in" checked)

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Access Admin Panel

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with your admin credentials.

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Public pages (en/ar)
│   │   ├── page.tsx       # Home page
│   │   ├── work/          # Work listing and project details
│   │   ├── services/      # Services page
│   │   ├── about/         # About page
│   │   └── contact/       # Contact page
│   ├── admin/             # Admin panel
│   │   ├── login/         # Login page
│   │   ├── projects/      # Project manager
│   │   ├── services/      # Services manager
│   │   ├── content/       # Content editor
│   │   └── settings/      # Site settings
│   └── api/admin/         # Admin API routes
├── components/
│   ├── public/            # Public website components
│   └── admin/             # Admin panel components
├── lib/
│   ├── supabase/          # Supabase client setup
│   ├── data.ts            # Data access layer
│   ├── i18n.ts            # Translations
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript types
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS`
   - `NEXT_PUBLIC_SITE_URL` (your production domain)
4. Deploy

### Update Robots.txt and Sitemap

After deployment, update `public/robots.txt` with your actual domain:

```
Sitemap: https://your-domain.com/sitemap.xml
```

## Content Management

### Adding Projects

1. Log into the admin panel
2. Navigate to **Projects** → **New Project**
3. Fill in both English and Arabic content
4. Add optional cover image URL (manually selected)
5. Set publication status and save

### Editing Page Content

1. Navigate to **Content** in the admin panel
2. Edit home page or about page content
3. Content is saved separately for each language

### Configuring Services

1. Navigate to **Services** in the admin panel
2. Edit existing services or add new ones
3. Provide descriptions in both languages

### Site Settings

1. Navigate to **Settings** in the admin panel
2. Configure contact information (email, WhatsApp)
3. Add social media links
4. Update site metadata

## Database Schema

The database includes four main tables:

- **projects** — Portfolio projects with bilingual content
- **services** — Service offerings with bilingual descriptions
- **site_settings** — Contact info, social links, metadata
- **page_content** — Editable page content (home, about)

All tables have Row Level Security (RLS) enabled. Public users can only read published content. Authenticated admins have full access.

## Security

- Admin routes are protected by middleware and server-side checks
- Service role key is only used server-side
- All mutations require admin authentication
- Input validation with Zod on all API routes
- No sensitive data exposed to client
- Public sign-up disabled in Supabase

## Performance

- Static generation where possible
- Optimized images with proper sizing
- Minimal client-side JavaScript
- Efficient database queries
- Proper caching strategies

## Accessibility

- Semantic HTML throughout
- Visible focus indicators
- Keyboard navigation support
- Proper heading hierarchy
- Alt text for images
- Sufficient color contrast
- Reduced motion support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Tested at 320px to 2560px widths

## Known Limitations

- Image uploads use external URLs (no direct file upload in v1)
- Single admin user (no multi-user support)
- No built-in analytics
- No email notifications for contact form

## Future Enhancements

- Direct image upload to Supabase Storage
- Project categories with filtering
- Blog/articles section
- Testimonials management
- Multi-language project filtering

## License

All rights reserved. This is a personal portfolio website.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with care by Kirlous Wael
