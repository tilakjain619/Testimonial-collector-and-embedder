# Testiflow
### Contents
- Quick Introduction
- Problem Statement
- Solution
- Features
- Tech Stack
- Installation
- Usage
- Folder Structure
- Conclusion

## Quick Introduction
**Testiflow** is a testimonial collector and embedder designed for businesses, creators and freelancers to build trust and showcase what their clients say about them. Built using modern web technologies like **React.js**, **Tailwind CSS**, and **MongoDB**, it enables businesses, creators and freelancers to share their page with customers, audience and clients respectively and collect feedback, suggestions and testimonials from them.
## Problem Statement
Every business or individual looking to build a good reputation needs positive feedback from their customers and audience. But it can be hard to reach out to everyone and gather their thoughts. That's why I created **Testiflow** - a tool that helps businesses, creators, and freelancers share their testimonial pages, making it easy to collect feedback, suggestions, and testimonials from customers, audiences, and clients.
## Solution
**Testiflow** simplifies the process of gathering testimonials by providing a customizable testimonial page that businesses, creators, and freelancers can easily share with their customers, audiences, and clients. Instead of manually reaching out for feedback, users can send a single link to their testimonial page, where people can leave reviews, suggestions, or testimonials. The platform also offers various embed themes, allowing users to easily display these testimonials on their website. This streamlined approach saves time and helps users build trust and credibility through authentic customer feedback.

## Features

- **Profile Creation**: Easily signup, create testimonial pages and share with others.
- **Testimonial Receiving**: Allows customers, audience and clients to write testimonials.
- **User Dashboard**: Users can track Average Rating, ratings over time, daily submissions, and total testimonials received.
- **Responsive Design**: Built with Tailwind CSS, the platform offers a seamless experience across all devices.
- **Authentication**: Login and authentication for users secured using jwt.
- **Upgrade to Pro**: User can upgrade to pro and get access to creation of unlimited testimonial pages (more features coming soon).
  
## Tech Stack

- **React.js**: React is a JavaScript library for building user interfaces. Also used to build single-page applications
- **Tailwind CSS**: A utility-first CSS framework for fast UI development.
- **MongoDB**: NoSQL database used to store user profiles and testimonials.
- **Axios**: For handling API requests.

## Installation

1. Clone the repository:

 ```bash
   git clone https://github.com/tilakjain619/Testimonial-collector-and-embedder.git
 ```
 
### Setup Project
2. **Client Setup**:

```bash
cd client
```
Install the dependencies:

```bash
npm install
```
Create a .env file in client folder and add the following environment variables:

```bash
VITE_BASE_API_URL  = http://localhost:8000
```

Running frontend:

```bash
npm run dev
```
3. **Server Setup**:

```bash
cd server
```
Install the dependencies:

```bash
npm install
```
Create a .env file in server folder and add the following environment variables:

```bash
MONGODB_URL  = mongodb://127.0.0.1:27017/testimonialCollector
ACCESS_TOKEN  = access@demo123
REFRESH_TOKEN  = refresh@demo123
CLOUD_NAME  = your_cloudinary_cloud_name
CLOUD_API_KEY  = your_cloudinary_cloud_key
CLOUD_API_SECRET  = your_cloudinary_cloud_secret
CLIENT_URL  = http://localhost:5173
STRIPE_SECRET_KEY  = your_stripe_secret_key
```

Running server side:

```bash
npm run dev
```
4. Running the application
Open http://localhost:5173 in your browser to see the application.

## Usage
- Business, creators and freelancers can sign up and create a profile.

![signup page](https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/testiflowImages/ezl8mzbpvus8j0sttc7w)

- Users can create and share testimonial page with their audience and clients.

![testimonial pages dashboard](https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/testiflowImages/yhynztprbkgz7abcf1b3)

- Audience/clients can write a testimonial.

![write testimonial page for customers](https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/testiflowImages/jniyakdf9ozdjkfjadhi)

- Users can track Average Rating, ratings over time, daily submissions, and total testimonials received via dashboard.

![user dashboard](https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/testiflowImages/ptinldxzd51uxswqaix1)

- Users can navigate to a specific testimonial page to view all the testimonials they've received. They can also select an embed theme (Grid/Marquee), copy the generated code, and easily integrate it into their website.

![specific testimonial's page](https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/testiflowImages/ahudavjgfq4gzdribnwz)

![embed options](https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/testiflowImages/vztrprpnldl7zi525u3g)

## Folder Structure
```bash
.
├── client        	  	# Client/frontend
│   ├── dist    	  	# Build version for demo
│   ├── public        	# Public assets
│   ├── src        	  	# Main code
│	│	├── api   		# API functions
│	│   ├── assets    	# Frontend assets
│	│   ├── components  # Components
│	│   ├── lib       	# Pre-defined functions
│	│   ├── pages       # Frontend route pages
│	│   ├── utils       # Utility function
│   ├── .env        	# Enviroment variables for frontend
├── server
│   ├── controllers   	# Control functions
│   ├── middleware    	# Middleware function
│   ├── models        	# Defined schemas for db collections
│   ├── routes        	# All backend routes
│   ├── .env        	# Enviroment variables for backend
```
## Conclusion
**Testiflow** makes it easy for businesses, creators, and freelancers to collect and display testimonials. With a simple link to share and customizable options for embedding feedback on websites, it helps users build trust and grow their reputation effortlessly.