# METRINA Client Inquiry System Setup Guide

This guide provides step-by-step instructions to configure, run, and deploy the client inquiry onboarding system.

---

## 1. Obtaining a Free Resend API Key

Resend handles the transactional emails for client confirmations and agency scoping notifications.

1. Navigate to [resend.com](https://resend.com) and click **Sign Up** (the free tier provides 3,000 emails/month).
2. Once logged in, go to the **API Keys** tab in the sidebar navigation.
3. Click **Create API Key**, name it `Metrina Portal`, select the **Sending Access** role, and click **Add**.
4. Copy the API Key (starts with `re_`) and save it securely. You will paste this into the `.env` configuration file.
5. *(Optional)* To send emails to custom domains instead of the sandbox default email (`onboarding@resend.dev`), add and verify your domain in the **Domains** tab by updating your DNS settings.

---

## 2. Setting Up a Free MongoDB Atlas Cluster

MongoDB Atlas provides a fully-managed cloud database.

1. Visit [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas) and register for a free account.
2. Create a new project named `Metrina` and click **Create Deployment**. Choose the **M0 (Free)** tier cluster.
3. Select your preferred Cloud Provider and Region, then deploy the database.
4. Set up security credentials:
   - Create a database user username and password (keep these safe).
   - Under **IP Access List**, select **Allow Access from Anywhere** (`0.0.0.0/0`) to allow connections from local environments and Render instances.
5. In the database dashboard, click **Connect** → **Drivers**.
6. Copy the Mongoose connection string:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/metrina?retryWrites=true&w=majority`
7. Replace `<username>` and `<password>` with your database user credentials.

---

## 3. Running the System Locally

### Step A: Configure Environment Variables
Inside the [server](file:///C:/Users/ELCOT/freelance-portfolio/server) directory, copy the `.env.example` file to `.env`:
```bash
cp server/.env.example server/.env
```
Open `server/.env` and update the keys with your MongoDB URI and Resend API Key:
```env
PORT=5000
MONGODB_URI=mongodb+srv://admin:secure_pass@cluster.mongodb.net/metrina
RESEND_API_KEY=re_xxxxxxxxxxxx
AGENCY_EMAIL=hello@metrina.dev
SENDER_EMAIL=onboarding@resend.dev
```

### Step B: Launch the Express Backend
Open a terminal in the project directory and run:
```bash
cd server
npm install
npm run dev
```
The server will boot up locally at `http://localhost:5000`. You should see `Successfully connected to MongoDB` in your terminal logs.

### Step C: Launch the Next.js Frontend
Open a separate terminal window and run:
```bash
npm run dev
```
The frontend application will start at `http://localhost:3000`. 
Navigate to `http://localhost:3000/get-started` to test the multi-step form!

---

## 4. Deploying the Backend to Render (Free Tier)

Render is a premium cloud platform for hosting node backend applications.

1. Commit your codebase to a remote GitHub/GitLab repository.
2. Go to [render.com](https://render.com) and log in using your GitHub account.
3. Click **New** → **Web Service**.
4. Link your git repository.
5. Configure the deployment settings:
   - **Name**: `metrina-inquiry-backend`
   - **Environment**: `Node`
   - **Region**: Select region closest to your clients.
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Instance Type**: **Free**
6. Click **Advanced** and add the environment variables matching your `.env` settings:
   - `PORT` = `10000` (Render binds to dynamic ports, but defining a default port is recommended)
   - `MONGODB_URI` = *Your MongoDB atlas connection string*
   - `RESEND_API_KEY` = *Your Resend API Key*
   - `AGENCY_EMAIL` = `hello@metrina.dev`
   - `SENDER_EMAIL` = *Your verified Resend email address or onboarding@resend.dev*
7. Click **Create Web Service**. Once Render builds and deploys, copy the public URL (e.g. `https://metrina-inquiry-backend.onrender.com`).
8. Update the frontend environment variable `NEXT_PUBLIC_API_URL` to point to `https://metrina-inquiry-backend.onrender.com/api/inquiry` to complete the production integration!
