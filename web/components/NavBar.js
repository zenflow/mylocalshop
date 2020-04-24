import { graphql } from '@gqless/react'
import { Container, Dropdown, Menu, Button } from 'semantic-ui-react'
import Link from 'next/link'
import { useUser } from '../lib/auth/react'

export const NavBar = graphql(() => {
  const user = useUser()
  return (
    <>
      <div style={{ height: '52px' }}/>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
        <Container>
          <Menu style={{ height: '50px', borderTop: 0, borderRadius: '0 0 8px 8px' }}>
            <Link href="/">
              <Menu.Item header as='a' href='/'>
                mylocalshop
              </Menu.Item>
            </Link>
            <Link href="/">
              <Menu.Item as='a' href='/'>
                Home
              </Menu.Item>
            </Link>
            {(user?.role === 'admin') && (
              <Link href='/users'>
                <Menu.Item as='a' href='/users'>Users</Menu.Item>
              </Link>
            )}
            <Menu.Menu position='right'>
              {user && (
                <Dropdown item icon='user circle outline' className='icon' direction='left'>
                  <Dropdown.Menu position='right'>
                    <Dropdown.Header content={`Logged in as ${user.email}`}/>
                    {user.role === 'admin' && <Dropdown.Header icon='universal access' content='Admin user'/>}
                    <Dropdown.Divider/>
                    <Dropdown.Item as='a' href='/api/auth/logout' icon='sign-out' content='Log out'/>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {!user && (
                <Menu.Item>
                  <Link href="/login">
                    <Button primary as='a' href='/login' icon='sign-in' content='Log in'/>
                  </Link>
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>
        </Container>
        <div/>
      </div>
    </>
  )
})
