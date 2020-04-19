# mylocalshop

Shop local, from home

---

## Installing

To install this app on Heroku:

1. Create app in Heroku Admin
2. In the Resources tab, find the "Heroku Postgres" add-on and provision the "Hobby Dev - Free" plan
3. In the Settings tab, set environment variables under "Config Vars"
3. Run `heroku stack:set container -a <app name>` locally (This one is the key)
4. In Deploy tab, select Github as deployment method, select repo, enable automatic deploys, and under "Manual Deploy" click "Deploy Branch"

---

## Issues
- Hasura graphql-engine's .cli-migrations docker image not working See de4179751dce532265b7b60824506aabf1ebc44e
    https://hasura.io/docs/1.0/graphql/manual/migrations/auto-apply-migrations.html#auto-apply-migrations

## TODO
merge in a next.js app
handle auth
