import { useCallback } from 'react'
import { SaveButton, Toolbar } from 'react-admin'
import { useForm } from 'react-final-form'
import { useAuth } from '../../lib/auth/auth-context'
import { resourcesMeta } from '../resourcesMeta'

export function CreateFormToolbar (props) {
  return (
    <Toolbar {...props} style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <CreateFormSaveButton {...props}/>
    </Toolbar>
  )
}

function CreateFormSaveButton (props) {
  const form = useForm()
  const { userId } = useAuth()
  const handleSubmitWithRedirect = useCallback(
    redirect => {
      if (resourcesMeta[props.resource].hasCreatedByField) {
        form.change('created_by', userId)
      }
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
      handleSubmitWithRedirect={handleSubmitWithRedirect}
    />
  )
}
