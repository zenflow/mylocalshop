import { useCallback } from 'react'
import { DeleteButton, SaveButton } from 'react-admin'
import { useForm } from 'react-final-form'
import { useAuth } from '../../lib/auth/auth-context'
import { resourcesMeta } from '../resourcesMeta'
import { BaseFormToolbar } from './BaseFormToolbar'

export function EditFormToolbar ({ hasDelete, ...props }) {
  return (
    <BaseFormToolbar {...props}>
      <EditFormSaveButton {...props}/>
      {hasDelete && <DeleteButton label="Delete"/>}
    </BaseFormToolbar>
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
