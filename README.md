# mylocalshop

Shop local, from home

---

## Deployment notes:

- When installing on Heroku, run `heroku stack:set container -a mylocalshop-hasura-engine` before connecting to repo & deploying

---

## TODO

- concatenate migrations & deploy
- admin pages:
    - show some <Loader/> for "loading" stateS
    - refresh button
    - title in <h1> & <head>
    - render resource views using `session` **and `data`** (example: 'user' role is denied access to edit users **except their own user**)
    - integrate apollo client /w subscriptions
- use graphql normally in google-strategy.js & /api/auth/...

- facebook auth provider
- delete old sessions when when user logs in

- `shops` table, `user.shops` field

---

- nextjs issues
    - dynamic components swallow errors! It should `Promise.reject(` errrors by default
    - build matchRoute function, use it like <Link href={matchRoute(href)} as={href}><a href={href}></a></Link>
- hasura graphql-engine issues
    - `hasura/graphql-engine:v1.2.1.cli-migrations-v2` crashes applying migrations on heroku
    - createdBy & updatedBy should be in "Frequently used columns"    
- next-connect issues
    - should propagate errors so they are logged to console by default
- handle errors in routes (server-side & client-side)
- fix identical files `hasura-support/lib/adminGraphql` & `web/lib/adminGraphql`
- develop hasura-support outside of docker container, with nodemon
- use prettier
- use some prop-types & typescript

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
