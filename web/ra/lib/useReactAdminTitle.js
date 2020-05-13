import { useEffect, useState } from 'react'

let title
function getTitle () {
  return title
}

const onTitleCallbacks = new Set()
function onTitle (cb) {
  onTitleCallbacks.add(cb)
  return () => onTitleCallbacks.delete(cb)
}

let element

if (process.browser) {
  element = document.getElementById('react-admin-title')
  if (!element) {
    element = Object.assign(document.createElement('div'), {
      id: 'react-admin-title',
      style: 'display: none;',
    })
    document.body.appendChild(element)
  }
  const observer = new MutationObserver(() => {
    title = element.innerText
    onTitleCallbacks.forEach(cb => cb(title))
  })
  observer.observe(element, { subtree: true, childList: true })
  // to destroy: `observer.disconnect()`
}

export function useReactAdminTitle () {
  if (!process.browser) {
    return
  }
  const [title, setTitle] = useState(getTitle())
  useEffect(() => onTitle(setTitle), [])
  return title
}
