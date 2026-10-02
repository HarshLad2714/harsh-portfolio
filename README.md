# Harsh Lad — Portfolio

Personal portfolio for Harsh Lad, Laravel team lead and project manager. Built with React and Vite, ready for Netlify.

## Local

```bash
npm install
npm run dev
```

## Deploy on Netlify

1. Push this repo to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and pick this repository.
3. Netlify reads `netlify.toml` on its own:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. The contact form is a Netlify Form named `contact`. After the first deploy, submissions show up under **Forms** in the Netlify dashboard.

You can also deploy without Git: run `npm run build` and drag the `dist` folder onto Netlify Drop.
