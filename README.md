# Sri Sakthi Makaliyamman Temple - Web App & Admin Portal

A fully responsive, production-grade temple management web application built with React, Vite, Framer Motion, and pure CSS.

## Features

### Public Website
- **Modern UI**: Temple-inspired themes, smooth Framer Motion animations.
- **Dynamic Pages**: Home, About, Gallery (Lightbox), Location (Map), Live Donations, YouTube Integrations, Contact.
- **Donation Gateway**: Mock Razorpay integration & UPI QR Code for instant tracking.

### Admin Portal
- **Dashboard**: Smart Accounting Dashboard calculating Income (Donations + Memberships) and automated Deductions (Event Expenses).
- **Member Management**: Track active temple members, categories (Mangalya, Family), tracking payments.
- **Donations Management**: Track online and manual donations efficiently.
- **Event Notebook**: Organizers can create dedicated events (Festivals, Poojas) and add nested itemized expenses with real-time total updates.
- **Exports**: Ability to print or save views as PDF via native print formatting.

## Tech Stack
- **Frontend**: React 18, React Router v6
- **Styling**: Vanilla CSS (Variables, Flexbox, CSS Grid)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Tooling**: Vite

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Access the portal:
   - Public Website: `http://localhost:5173/`
   - Admin login: `http://localhost:5173/admin/login`
   - **Login Credentials**: Username: `admin`, Password: `1234`
