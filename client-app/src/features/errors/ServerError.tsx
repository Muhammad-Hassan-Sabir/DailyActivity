import { useStore } from '../../app/stores/store'
import { Container, Header, Segment } from 'semantic-ui-react'

function ServerError() {
    const {commonStore}=useStore()
    const {error}=commonStore
  return (
    <Container>
    <Header as='h1' content="Server Error"></Header>
    <Header sub as='h5' color='red' content={error?.message}></Header>
    {error?.details&& <Segment>
        <Header as='h4' content='Stack trace' color='teal'></Header>
        <code style={{marginTop:'10px'}} > {error.details}</code>
        </Segment>}
    </Container>
  )
}

export default ServerError