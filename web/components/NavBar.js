import { Container, Dropdown, Menu, Button } from 'semantic-ui-react'
import Link from 'next/link'
import { useSession } from '../lib/auth/react'

export const NavBar = () => {
  const session = useSession()
  return (
    <>
      <div style={{height: '52px'}}/>
      <div style={{position: 'fixed', top: 0, left: 0, width: '100%'}}>
        <Container>
          <Menu style={{height: '50px', borderTop: 0, borderRadius: '0 0 8px 8px'}}>
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
            <Dropdown item simple text='Collections'>
              <Dropdown.Menu>
                <Link href='/users'>
                  <Dropdown.Item as='a' href='/users'>Users</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position='right'>
              {session && (
                <Dropdown item icon='user' className='icon' direction='left'>
                  <Dropdown.Menu position='right'>
                    <Dropdown.Header content={`Logged in as ${session.user.email}`}/>
                    <Dropdown.Item icon='user circle outline' content='Profile'/>
                    <Dropdown.Divider/>
                    <Dropdown.Item as='a' href='/api/auth/logout' icon='sign-out' content='Log out'/>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {!session && (
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
}
