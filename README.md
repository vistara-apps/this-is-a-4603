# Critter Canvas

Showcase Beautiful Animal Photos, Effortlessly Organized.

## Overview

Critter Canvas is a web application built with Remix that allows users to showcase their animal photos with easy organization and customization. The application provides automated photo tagging, customizable gallery layouts, and one-click deployment.

## Features

- **Automated Photo Upload & Tagging**: Upload multiple animal photos at once with automatic tag suggestions based on image analysis.
- **Customizable Gallery Layouts**: Choose from several pre-designed gallery templates and customize the look and feel of your photo displays.
- **Remix One-Click Deployment**: Deploy your website to popular hosting platforms like Vercel or Netlify with minimal technical configuration.
- **Photo Descriptions & Stories**: Add detailed descriptions and stories to individual photos to provide context and narrative.

## Tech Stack

- **Frontend**: Remix, React, Tailwind CSS
- **Backend**: Remix (Node.js), Supabase
- **Storage**: Pinata IPFS (for photos)
- **AI**: OpenAI (for automated tagging)
- **Payments**: Stripe (for subscriptions)
- **Deployment**: Vercel/Netlify

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Pinata account
- OpenAI API key
- Stripe account (for subscription features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/critter-canvas.git
   cd critter-canvas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   STRIPE_BASIC_PRICE_ID=your_stripe_basic_price_id
   STRIPE_PRO_PRICE_ID=your_stripe_pro_price_id
   APP_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

### Database Setup

Create the following tables in your Supabase database:

1. **users**: Stores user information
   - userId (primary key)
   - email
   - subscriptionPlan
   - createdAt

2. **photos**: Stores photo metadata
   - photoId (primary key)
   - userId (foreign key)
   - imageUrl
   - description
   - tags
   - uploadDate

3. **gallery_settings**: Stores gallery customization settings
   - galleryId (primary key)
   - userId (foreign key)
   - layoutType
   - customizationOptions

4. **subscriptions**: Stores subscription information
   - subscriptionId (primary key)
   - userId (foreign key)
   - plan
   - status
   - currentPeriodEnd

5. **deployments**: Stores deployment information
   - deploymentId (primary key)
   - userId (foreign key)
   - platform
   - domain
   - status
   - createdAt
   - completedAt

## Deployment

### Vercel Deployment

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

### Netlify Deployment

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

## API Documentation

The application provides a RESTful API for interacting with the gallery programmatically. See the [API Documentation](http://localhost:3000/docs/api) for details.

## Business Model

Critter Canvas uses a subscription-based business model:

- **Basic Plan**: $5/month
  - Up to 100 photos
  - Basic gallery layouts
  - Standard photo quality
  - Email support

- **Professional Plan**: $15/month
  - Unlimited photos
  - All gallery layouts
  - High-quality photo storage
  - Advanced customization
  - Priority support
  - Custom domain

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Remix](https://remix.run/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Pinata](https://pinata.cloud/)
- [OpenAI](https://openai.com/)
- [Stripe](https://stripe.com/)
- [Lucide Icons](https://lucide.dev/)

