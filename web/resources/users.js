import {
  List, Datagrid, TextField, SelectField, EditButton, DateField,
  Edit, SimpleForm, TextInput, SelectInput, DateInput,
  Create,
} from 'react-admin'

export default () => {
  const roleChoices = [
    { id: 'admin', name: 'Administrator' },
    { id: 'user', name: 'Normal User' },
  ]

  const UserList = (props) => (
    <List title="List Users" {...props}>
      <Datagrid>
        <TextField source="email" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <SelectField source="role" choices={roleChoices} />
        <DateField source="createdAt"/>
        <DateField source="updatedAt"/>
        {props.hasEdit && <EditButton/>}
      </Datagrid>
    </List>
  )

  const Title = ({ record }) => <span>Edit User {record.firstName} {record.lastName}</span>
  const UserEdit = (props) => (
    <Edit title={<Title/>} {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <SelectInput source="role" choices={roleChoices} />
        <DateInput source="createdAt" disabled/>
        <DateInput source="updatedAt" disabled/>
      </SimpleForm>
    </Edit>
  )

  const UserCreate = (props) => (
    <Create title="Create User" {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <SelectInput source="role" choices={roleChoices} />
      </SimpleForm>
    </Create>
  )

  return {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
  }
}
