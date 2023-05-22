import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'
import { NavLink } from 'react-router-dom';
 
function NavBar() {
  return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}} />
                    Daily Activity
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities'></Menu.Item>
                <Menu.Item as={NavLink} to='/createActivity'>
                    <Button  positive content="Create Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>
        

  )
}

export default NavBar