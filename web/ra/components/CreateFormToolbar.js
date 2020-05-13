import { useCallback } from 'react'
import { SaveButton } from 'react-admin'
import { useForm } from 'react-final-form'
import { useAuth } from '../../lib/auth/auth-context'
import { resourcesMeta } from '../resourcesMeta'
import { BaseFormToolbar } from './BaseFormToolbar'

export function CreateFormToolbar (props) {
  return (
    <BaseFormToolbar {...props}>
      <CreateFormSaveButton {...props}/>
    </BaseFormToolbar>
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
