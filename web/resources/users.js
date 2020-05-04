import {
  List, Datagrid, TextField, BooleanField, DateField,
  Edit, SimpleForm, Toolbar, SaveButton, DeleteButton, TextInput, BooleanInput,
  Create,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../components/errors'

export default ({ isUserAdmin, isLoggedIn }) => {
  const UserList = props => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="email" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <BooleanField source="isAdmin" />
        <DateField source="createdAt"/>
        <DateField source="updatedAt"/>
      </Datagrid>
    </List>
  )

  const UserEditToolbar = props => (
    <Toolbar {...props} style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <SaveButton label="Save" submitOnEnter redirect={false} disabled={props.pristine}/>
      {isUserAdmin && <DeleteButton label="Delete"/>}
    </Toolbar>
  )
  const EditUserAside = ({ record }) => (
    <div>{record?.picture && <img src={record.picture} />}</div>
  )
  const UserEdit = props => (
    <Edit {...props} aside={<EditUserAside/>}>
      <SimpleForm toolbar={<UserEditToolbar/>}>
        <TextField source="email" disabled />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <BooleanInput source="isAdmin" disabled={!isUserAdmin} />
        <DateField source="createdAt"/>
        <DateField source="updatedAt"/>
      </SimpleForm>
    </Edit>
  )

  const UserCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <BooleanInput source="isAdmin" />
      </SimpleForm>
    </Create>
  )

  return {
    list: isUserAdmin ? UserList : AccessDeniedErrorPage,
    edit: isLoggedIn ? UserEdit : AccessDeniedErrorPage,
    create: isUserAdmin ? UserCreate : AccessDeniedErrorPage,
  }
}
