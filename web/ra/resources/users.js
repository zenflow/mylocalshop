import {
  List, Datagrid, TextField, BooleanField, DateField, ReferenceField,
  Edit, SimpleForm, TextInput, BooleanInput,
  Create,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../../components/errors'
import { ListActions } from '../components/ListActions'
import { EditFormToolbar } from '../components/EditFormToolbar'
import { EditActions } from '../components/EditActions'
import { CreateActions } from '../components/CreateActions'

export default ({ isLoggedIn, isUserAdmin }) => {
  const UserList = props => (
    <List {...props} actions={<ListActions/>}>
      <Datagrid rowClick="edit">
        <TextField source="email" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <BooleanField source="is_admin" />
        <DateField source="created_at" showTime/>
        <ReferenceField source="created_by" reference="users">
          <TextField source="email"/>
        </ReferenceField>
        <DateField source="updated_at" showTime/>
        <ReferenceField source="updated_by" reference="users">
          <TextField source="email"/>
        </ReferenceField>
      </Datagrid>
    </List>
  )

  const UserEdit = props => (
    <Edit {...props} actions={<EditActions/>} title="Edit User">
      <SimpleForm toolbar={<EditFormToolbar hasDelete={isUserAdmin}/>}>
        <TextField source="email" disabled />
        <TextInput source="first_name" />
        <TextInput source="last_name" />
        <BooleanInput source="is_admin" disabled={!isUserAdmin} />
        <DateField source="created_at" showTime/>
        <ReferenceField source="created_by" reference="users" link={isUserAdmin}>
          <TextField source="email"/>
        </ReferenceField>
        <DateField source="updated_at" showTime/>
        <ReferenceField source="updated_by" reference="users" link={isUserAdmin}>
          <TextField source="email"/>
        </ReferenceField>
      </SimpleForm>
    </Edit>
  )

  const UserCreate = props => (
    <Create {...props} actions={<CreateActions/>}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="first_name" />
        <TextInput source="last_name" />
        <BooleanInput source="is_admin" />
      </SimpleForm>
    </Create>
  )

  return {
    list: isUserAdmin ? UserList : AccessDeniedErrorPage,
    edit: isLoggedIn ? UserEdit : AccessDeniedErrorPage,
    create: isUserAdmin ? UserCreate : AccessDeniedErrorPage,
  }
}
