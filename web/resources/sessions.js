import {
  List, Datagrid, TextField, DateField, ReferenceField,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../components/errors'

export default ({ isUserAdmin }) => {
  const SessionList = (props) => (
    <List {...props}>
      <Datagrid>
        <DateField source="createdAt" showTime/>
        <TextField source="provider" />
        <ReferenceField label="User" source="userId" reference="users">
          <TextField source="email"/>
        </ReferenceField>
        <DateField source="lastUsedAt" showTime />
      </Datagrid>
    </List>
  )

  return {
    list: isUserAdmin ? SessionList : AccessDeniedErrorPage,
  }
}
