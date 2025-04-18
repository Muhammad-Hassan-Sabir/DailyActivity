import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { text } from 'stream/consumers';
 
function NavBar() {
    const {userStore:{user,logout}}=useStore();
  return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}} />
                    Daily Activity
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities'></Menu.Item>
                <Menu.Item as={NavLink} to='/errors' name='Errors'></Menu.Item>
                <Menu.Item as={NavLink} to='/createActivity'>
                    <Button  positive content="Create Activity"></Button>
                </Menu.Item>
                <Menu.Item position='right' >
                    <Image src={user?.image || '/assets/user.png'} spaced='right' avatar ></Image>
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My Profile' icon='user'/>
                        <Dropdown.Item onClick={logout} text='Logout' icon='power'></Dropdown.Item>
                        </Dropdown.Menu>
                   
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
        

  )
}

export default observer(NavBar)