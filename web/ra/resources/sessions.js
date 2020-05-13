import {
  List, Datagrid, TextField, DateField, ReferenceField, NumberField,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../../components/errors'
import { ListActionsToolbar } from '../components/ListActionsToolbar'

export default ({ isUserAdmin }) => {
  const SessionList = (props) => (
    <List {...props} actions={<ListActionsToolbar/>}>
      <Datagrid>
        <DateField source="created_at" showTime/>
        <TextField source="provider" />
        <ReferenceField label="User" source="user_id" reference="users">
          <TextField source="email"/>
        </ReferenceField>
        <DateField source="last_hit" showTime />
        <NumberField source="hit_count"/>
      </Datagrid>
    </List>
  )

  return {
    list: isUserAdmin ? SessionList : AccessDeniedErrorPage,
  }
}
