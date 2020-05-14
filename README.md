# mylocalshop

Shop local, from home

---

## Deployment notes:

- When installing on Heroku, run `heroku stack:set container -a mylocalshop-hasura-engine` before connecting to repo & deploying

---

## TODO

- `shops` table, `user.shops` field

- fix identical files `hasura-support/lib/adminGraphql` & `web/lib/adminGraphql`
- facebook auth provider
- integrate apollo client subscriptions /w admin pages
- use react-admin's provided interface for permissions
- compute `siteMap` tree structure (with `title` & `icon` on leafs) from `auth`, & render MainMenu & PageHeading (& sitemap.xml?) based on it
- show ProgressBar when react-admin is loading/refreshing?
- delete old sessions when user logs in
- nextjs issues
    - dynamic components swallow errors! It should `Promise.reject(` errrors by default
    - build matchRoute function, use it like <Link href={matchRoute(href)} as={href}><a href={href}></a></Link>
- hasura graphql-engine issues
    - createdBy & updatedBy should be in "Frequently used columns"
    - deploy in one service!
- next-connect issues
    - on errors, in addition to sending error message in http response, should propagate error so they are logged to console by default
- react-admin issues
    - need to manually pass hasCreate to `actions` prop of `<Edit>`, need to (invent &) manually pass hasDelete everywhere 
    - render resource views using `session` **and `data`** (example: 'user' role is denied access to edit users **except their own user**)
- handle errors in routes (server-side & client-side)
- styles
    - center things vertically when page is relatively empty (i.e. error pages)
    - do them all properly, with material-ui's `makeStyles`
    - mobile-friendliness
- develop hasura-support outside of docker container, with nodemon
- use prettier
- use some prop-types & typescript
- cypress tests
- use rollbar (or similar) 
- use google analytics
    - https://nextjs.org/docs/advanced-features/measuring-performance#sending-results-to-analytics 
- i18n


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
        - in docker container, run nodejs servers and, in a subcontainer, hasura-engine https://itnext.io/docker-in-docker-521958d34efd
            - X this idea. Requires exposing docker socket as volume from host. 
                1. Not going to work easy with Windows development host
                2. Hasura (and other platforms) unlikely to expose docker socket to containers like this 
