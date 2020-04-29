# mylocalshop

Shop local, from home

---

## Deployment notes:

- When installing on Heroku, run `heroku stack:set container -a mylocalshop-hasura-engine` before connecting to repo & deploying

---

## TODO

- title (in <AppBar> & <head>)
- ra refresh button / loader
- view list & edit/create at same time, with Panel

- integrate new gql client & subscribe to current user
- MainMenu based on `resources` &  `resources` based on permissions
- AccessDenied page

- create "shop-owner" role, `shops` table, `user.shops` field

- createdBy & updatedBy fields
- unified NotFound page
---

- facebook auth provider
- optimize admin with code-splitting
    - in `/pages/admin/[...args].js`
        - use dynamic imports (e.g. `await import(\`../resources/${name}\`)`)
        - use `next/dynamic` and `mem`?
    - in `/components/NextReactAdminContext.js`
        - import and use [lite] `resourcesMeta` instead of [heavy] `resources`
- delete sessions from database when `now > created_at + ttl`
- fix identical files `hasura-support/lib/adminGraphql` & `web/lib/adminGraphql`
- develop hasura-support normally (not in Docker) and use nodemon

- Simplify deployment and improve production performance by deploying all 3 processes in same way
  - Either
    - Deploy via kubernetes cluster on DigitalOcean
      - https://github.com/hasura/hasura-k8s-stack
      - https://kubernetes.io/docs/tutorials/
      - https://kubectl.docs.kubernetes.io/pages/app_customization/bases_and_variants.html
    - combine 3 processes into 1 and use single docker image
      - main process will be node server that manages 3 child processes and proxies requests to web & hasura-engine
      - either
        - hack the Hasura docker image to also run node
        - *** in docker container, run nodejs servers and, in a subcontainer, hasura-engine https://itnext.io/docker-in-docker-521958d34efd
