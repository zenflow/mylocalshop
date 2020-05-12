import { useCallback } from 'react'
import { DeleteButton, SaveButton, Toolbar } from 'react-admin'
import { useForm } from 'react-final-form'
import { useAuth } from '../../lib/auth/auth-context'
import { resourcesMeta } from '../resourcesMeta'

export function EditFormToolbar ({ hasDelete, ...props }) {
  return (
    <Toolbar {...props} style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <EditFormSaveButton {...props}/>
      {hasDelete && <DeleteButton label="Delete"/>}
    </Toolbar>
  )
}

function EditFormSaveButton (props) {
  const form = useForm()
  const { userId } = useAuth()
  const handleSubmitWithRedirect = useCallback(
    redirect => {
      if (resourcesMeta[props.resource].hasUpdatedByField) {
        form.change('updated_by', userId)
      }
      props.handleSubmitWithRedirect(redirect)
    },
    [form, userId],
  )
  return (
    <SaveButton
      label="Save"
      submitOnEnter
      redirect={false}
      disabled={props.pristine}
      handleSubmitWithRedirect={handleSubmitWithRedirect}
    />
  )
}
