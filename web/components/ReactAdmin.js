import { AdminContext, Notification, Resource } from 'react-admin'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import { createHashHistory } from 'history'

import { getResources } from '../resources'

const history = createHashHistory()

export const NewReactAdmin = ({ dataProvider, authProvider }) => {
  const resources = getResources()

  const routeElements = []
  for (const [name, resource] of Object.entries(resources)) {
    for (const [action, path] of [['list', `/${name}`], ['create', `/${name}/create`], ['edit', `/${name}/:id`], ['show', `/${name}/:id/show`]]) {
      if (resource[action]) {
        const View = resource[action]
        routeElements.push(
          <Route
            key={`${action} ${name}`}
            exact
            path={path}
            render={({ history, location, match }) => (
              <View
                resource={name}
                basePath={`/${name}`}
                hasList={!!resource.list}
                hasEdit={!!resource.edit}
                hasCreate={!!resource.create}
                hasShow={!!resource.show}
                id={match.params.id}
                {...{ history, location, match }}
              />
            )}
          />,
        )
      }
    }
  }

  return (
    <AdminContext {...{ dataProvider, authProvider }}>
      {Object.keys(resources).map(name =>
        <Resource key={name} name={name} intent="registration"/>,
      )}
      <ConnectedRouter history={history}>
        <Switch>{routeElements}</Switch>
      </ConnectedRouter>
      <Notification/>
    </AdminContext>
  )
}

export const ReactAdmin = NewReactAdmin
