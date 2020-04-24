# mylocalshop

Shop local, from home

---

## Deployment notes:

- When installing on Heroku, run `heroku stack:set container -a mylocalshop-hasura-engine` before connecting to repo & deploying

---

## TODO

- snake_case to camelCase
- error page

- add `me` to remote schema
- deploy
- dump production data to migrations
- create `shops` `products` `shop_products` `categories` `shop_sections` `bundles` & `orders`

- linting
- testing

- facebook auth provider
- delete sessions from database both (1) on logout, and (2) when `now > created_at + ttl`
- fix identical files `hasura-support/lib/adminGraphql` & `web/lib/adminGraphql`
- enable cache control for http://hasura-support/auth-hook
- use nodemon to develop hasura-support
- port to typescript

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
