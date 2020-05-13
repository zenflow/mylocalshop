import { BaseActionsToolbar } from './BaseActionsToolbar'
import { ListButton } from 'react-admin'

export function CreateActionsToolbar ({ resource, hasList, basePath }) {
  return (
    <BaseActionsToolbar {...{ resource, hasList }}>
      {hasList && <ListButton basePath={basePath}/>}
    </BaseActionsToolbar>
  )
}
