import {
  List, Datagrid, TextField, DateField, ReferenceField, NumberField,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../components/errors'

export default ({ session }) => {
  const isUserAdmin = session?.user.isAdmin

  const SessionList = (props) => (
    <List {...props}>
      <Datagrid>
        <DateField source="createdAt" showTime/>
        <TextField source="provider" />
        <ReferenceField label="User" source="userId" reference="users">
          <TextField source="email"/>
        </ReferenceField>
        <DateField source="lastHit" showTime />
        <NumberField source="hitCount"/>
      </Datagrid>
    </List>
  )

  return {
    list: isUserAdmin ? SessionList : AccessDeniedErrorPage,
  }
}
