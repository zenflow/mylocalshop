import {
  List, Datagrid, TextField, DateField, ReferenceField
} from 'react-admin'

export default () => {

  const SessionList = (props) => (
    <List title="List Sessions" {...props}>
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
    list: SessionList,
  }
}
