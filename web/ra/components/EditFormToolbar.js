import { Toolbar, SaveButton, DeleteButton } from 'react-admin'

export function EditFormToolbar ({ hasDelete, ...props }) {
  return (
    <Toolbar {...props} style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <SaveButton label="Save" submitOnEnter redirect={false} disabled={props.pristine}/>
      {hasDelete && <DeleteButton label="Delete"/>}
    </Toolbar>
  )
}
