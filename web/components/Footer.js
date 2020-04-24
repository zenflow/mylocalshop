import { Container, List, Segment } from 'semantic-ui-react'

export const Footer = () => {
  return (
    <Segment vertical style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <Container textAlign='center'>
        <List horizontal divided link size='medium'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  )
}
