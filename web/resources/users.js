import {
  List, Datagrid, TextField, BooleanField, DateField, ReferenceField,
  Edit, SimpleForm, Toolbar, SaveButton, DeleteButton, TextInput, BooleanInput,
  Create,
} from 'react-admin'
import { AccessDeniedErrorPage } from '../components/errors'

export default ({ session }) => {
  const isUserAdmin = session?.user.is_admin

  const UserList = props => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="email" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <BooleanField source="is_admin" />
        <DateField source="created_at" showTime/>
        <ReferenceField source="createdBy" reference="users">
          <TextField source="email"/>
        </ReferenceField>
        <DateField source="updated_at" showTime/>
        <ReferenceField source="updatedBy" reference="users">
          <TextField source="email"/>
        </ReferenceField>
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
    <Create {...props}>
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
    edit: session ? UserEdit : AccessDeniedErrorPage,
    create: isUserAdmin ? UserCreate : AccessDeniedErrorPage,
  }
}
