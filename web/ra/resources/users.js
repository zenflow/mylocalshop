import {
  List, Datagrid, TextField, BooleanField, DateField, ReferenceField,
  Edit, Create, SimpleForm, TextInput, BooleanInput,
  required, email,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../../components/errors'
import { ListActionsToolbar } from '../components/ListActionsToolbar'
import { EditFormToolbar } from '../components/EditFormToolbar'
import { EditActionsToolbar } from '../components/EditActionsToolbar'
import { CreateActionsToolbar } from '../components/CreateActionsToolbar'
import { CreateFormToolbar } from '../components/CreateFormToolbar'

export default ({ isLoggedIn, isUserAdmin, userId }) => {
  const UserList = props => (
    <List {...props} actions={<ListActionsToolbar/>}>
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

  const UserTitle = ({ record }) => record.id === userId
    ? 'My Profile'
    : 'Edit User' // `Edit User ${record.full_name}` // TODO
  const UserEdit = props => (
    <Edit {...props} actions={<EditActionsToolbar/>} title={<UserTitle/>}>
      <SimpleForm toolbar={<EditFormToolbar hasDelete={isUserAdmin}/>}>
        <TextField source="email" disabled />
        <TextInput source="first_name" validate={required()} />
        <TextInput source="last_name" validate={required()} />
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
    <Create {...props} actions={<CreateActionsToolbar/>}>
      <SimpleForm toolbar={<CreateFormToolbar/>} initialValues={{ is_admin: false }}>
        <TextInput source="email" validate={[required(), email()]} />
        <TextInput source="first_name" validate={required()} />
        <TextInput source="last_name" validate={required()} />
        <BooleanInput source="is_admin" />
      </SimpleForm>
    </Create>
  )

  return {
    create: isUserAdmin ? UserCreate : AccessDeniedErrorPage,
    list: isUserAdmin ? UserList : AccessDeniedErrorPage,
    edit: isLoggedIn ? UserEdit : AccessDeniedErrorPage,
  }
}
