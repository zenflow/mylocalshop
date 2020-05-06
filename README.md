# mylocalshop

Shop local, from home

---

## Deployment notes:

- When installing on Heroku, run `heroku stack:set container -a mylocalshop-hasura-engine` before connecting to repo & deploying

---

## TODO

- merge hasura-engine & hasura-support and then remove hasura-support cache-control & do session.lastHit
- use prettier
- use websocket link for mutations and regular queries too

- admin pages:
    - render resource views using `session` **and `data`** (example: 'user' role is denied access to edit users **except their own user**)
    - title in <h1> & <head>
    - show some <Loader/> for "loading" stateS
    - refresh button
    - integrate apollo client /w subscriptions

- `shops` table, `user.shops` field

- remove typescript but add prop types ffs

---

- facebook auth provider
- delete old sessions when when user logs in (i.e. delete sessions where `now > created_at + ttl`)

---

- hasura graphql-engine issue: createdBy & updatedBy should be in "Frequently used columns" 
- user feedback during login/logout process (loader + notification)
- immutable records in postgresql (for sessions resource)
- fix identical files `hasura-support/lib/adminGraphql` & `web/lib/adminGraphql`
- next-connect should propagate errors so they are logged to console by default
- develop hasura-support outside of docker container, with nodemon

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
