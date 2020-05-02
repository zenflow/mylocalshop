import {
  List, Datagrid, TextField, DateField, ReferenceField,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../components/errors'

export default ({ isUserAdmin }) => {
  const SessionList = (props) => (
    <List {...props}>
      <Datagrid>
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="provider" />
        <ReferenceField label="User" source="userId" reference="users">
          <TextField source="email"/>
        </ReferenceField>
      </Datagrid>
    </List>
  )

  return {
    list: isUserAdmin ? SessionList : AccessDeniedErrorPage,
  }
}
