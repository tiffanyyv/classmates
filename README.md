# Classmates online mentorship

## Table of contents
TBA

## Team Atlantic Developer guide

### Dependcies + development
Install Dependencies:
```bash
npm install
```

Runs development server + webpack:
```bash
npm run dev
```
Will be running on [http://localhost:3000](http://localhost:3000)
This script will also auto refresh the page whenever you make changes.

### Code ettique
- Each component and page directory should have a clear "entry point" i.e. should have an index.js file or a file with the same name as the directory
- Use descriptive naming for components, functions, and variables
  - EX) An api request for course information: getCourse vs getCourseInfoById
  - EX)

### Where to do your work
#### Backend
Your routes will be made in `pages/api/` or your own express server, whichever the team prefers.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### Frontend
Each directory and file is a route in the `page` directory. The pages will be built out and we will "plugin" our feature components into our pages.

### Pull requests
Please follow the git workflow guide outlined in the google drive. For all pull request please tag Chris (cmjosephs) and another member working on a similar module for code review and pull request approval.

## Official Documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

