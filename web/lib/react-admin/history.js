import Router from 'next/router'
// import { createHashHistory } from 'history'
import { matchRoute } from '../../matchRoute'

let history

export function getHistory () {
  if (history) {
    return history
  }
  // return history = createHashHistory() // uncomment this if you want to use pages/dev/default-admin-ui
  const listeners = new Set()
  history = {
    length: 1,
    action: 'POP',
    location: urlToLocation(Router.asPath),
    createHref ({ pathname, search }) {
      return [pathname, search].filter(Boolean).join('')
    },
    async push (to) {
      const { pathname, search } = typeof to === 'string'
        ? urlToLocation(to)
        : {
          pathname: to.pathname || history.location.pathname,
          search: to.search || '',
        }
      const query = Object.fromEntries(new URLSearchParams(search))
      const route = matchRoute(pathname)
      await Router.push(route, { pathname, query })
    },
    listen (listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
  Router.events.on('beforeHistoryChange', url => {
    history.location = urlToLocation(url)
    history.action = 'PUSH'
    history.length++
    // Actually this history change might be a POP or a REPLACE, but the above seems to work...
    listeners.forEach(listener => {
      listener(history.location, history.action)
    })
  })
  return history
}

function urlToLocation (url) {
  const urlParts = url.split('?')
  return {
    pathname: urlParts[0],
    search: urlParts[1] ? `?${urlParts[1]}` : '',
  }
}
