import {
  List, Datagrid, TextField, DateField, ReferenceField,
} from 'react-admin'
import { Protected } from '../components/auth'

export default ({ isUserAdmin }) => {
  const SessionList = (props) => (
    <Protected condition={isUserAdmin}>
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
    </Protected>
  )

  return {
    list: SessionList,
  }
}
