import { RefreshButton } from 'react-admin'
import { ActionsToolbar } from './ActionsToolbar'

export function EditActions ({ resource }) {
  return (
    <ActionsToolbar resource={resource}>
      <RefreshButton/>
    </ActionsToolbar>
  )
}
