import { ListButton, RefreshButton } from 'react-admin'
import { BaseActionsToolbar } from './BaseActionsToolbar'

export function EditActionsToolbar ({ resource, basePath, hasList }) {
  return (
    <BaseActionsToolbar resource={resource}>
      {hasList && <ListButton basePath={basePath}/>}
      <RefreshButton/>
    </BaseActionsToolbar>
  )
}
