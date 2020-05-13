import { ListButton, RefreshButton } from 'react-admin'
import { BaseActionsToolbar } from './BaseActionsToolbar'

export function EditActionsToolbar ({ resource, hasList, basePath }) {
  return (
    <BaseActionsToolbar {...{ resource, hasList }}>
      {hasList && <ListButton basePath={basePath}/>}
      <RefreshButton/>
    </BaseActionsToolbar>
  )
}
