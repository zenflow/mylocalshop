import { Toolbar } from 'react-admin'

export function BaseFormToolbar ({ children, ...props }) {
  return (
    <Toolbar {...props} style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      {children}
    </Toolbar>
  )
}
