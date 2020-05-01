import {
  List, Datagrid, TextField, SelectField, DateField,
  Edit, SimpleForm, Toolbar, SaveButton, DeleteButton, TextInput, SelectInput,
  Create,
} from 'react-admin'
import { Protected } from '../components/auth'

// TODO: make this dynamic from database? :p
const roleChoices = [
  { id: 'admin', name: 'Administrator' },
  { id: 'user', name: 'Normal User' },
]

export default ({ isUserAdmin }) => {
  const UserList = props => (
    <Protected condition={isUserAdmin}>
      <List {...props}>
        <Datagrid rowClick="edit">
          <TextField source="email" />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <SelectField source="roleId" choices={roleChoices} />
          <DateField source="createdAt"/>
          <DateField source="updatedAt"/>
        </Datagrid>
      </List>
    </Protected>
  )

  const UserEditToolbar = props => (
    <Toolbar {...props} style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <SaveButton label="Save" submitOnEnter redirect={false} disabled={false && props.pristine}/>
      {isUserAdmin && <DeleteButton label="Delete"/>}
    </Toolbar>
  )
  const EditUserAside = ({ record }) => (
    <div>{record?.picture && <img src={record.picture} />}</div>
  )
  const UserEdit = props => (<>
    <Edit {...props} aside={<EditUserAside/>}>
      <SimpleForm toolbar={<UserEditToolbar/>}>
        <TextField source="email" disabled />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <SelectInput source="roleId" choices={roleChoices} disabled={!isUserAdmin} />
        <DateField source="createdAt"/>
        <DateField source="updatedAt"/>
      </SimpleForm>
    </Edit>
  </>)

  const UserCreate = props => (
    <Protected condition={isUserAdmin}>
      <Create {...props}>
        <SimpleForm>
          <TextInput source="email" />
          <TextInput source="firstName" />
          <TextInput source="lastName" />
          <SelectInput source="roleId" choices={roleChoices} />
        </SimpleForm>
      </Create>
    </Protected>
  )

  return {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
  }
}
