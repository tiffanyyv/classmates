# Classmates online mentorship

## Table of contents
TBA

## Team Atlantic Developer guide

### Dependcies + development
Install Dependencies:
```bash
npm install
```

Runs development server:
```bash
npm run dev
```
Will be running on [http://localhost:3000](http://localhost:3000)
This script will also run webpack and auto refresh the page whenever you make changes.

### Code ettique
- Each component and page directory should have a clear "entry point" i.e. should have an index.js file or a file with the same name as the directory
- Use descriptive naming for components, functions, and variables
  - EX) An api request for course information: getCourse vs getCourseInfoById
  - EX) className="container" vs className="calendar-container"
- Consistent across modules
  - EX) backend uses callbacks OR promises OR async await, not a mix
- CSS: We will be using CSS modules. Will discuss how front end team wants to handle the file placement during meeting time
- Some pages do not require work to be done in the `components` directory. Immediate example are the landing page, login, and signup page. Additional components that are not primary features should be created in `features` directory

### Where to do your work
#### Backend
Your routes will be made in `pages/api/` or your own express server, whichever the team prefers.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### Frontend
- Each directory and file is a route in the `page` directory.
- The pages will be built out and we will "plugin" our feature components into our pages.
- Main features will be built out in the `components` folder and conditionally rendered in their page as necessary.
- To view your screen with or without the sidebar and navbar skeleton, go `utils/context/AuthProvider` and change `isAuthenticated` to true or false. This is a placeholder till authentication is fully set up.

### Pull requests
Please follow feature branch workflow and the guide outlined in the google drive. For all pull request please tag Chris (cmjosephs) and another member working on a similar module for code review and pull request approval.

## Official Documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

