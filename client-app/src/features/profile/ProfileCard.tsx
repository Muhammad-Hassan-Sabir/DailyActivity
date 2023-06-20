import { profile } from 'console'
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, Icon, Image } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'

interface Props{
    profile:Profile
}

function ProfileCard({profile}:Props) {
  return (
    <Card as={Link} to={`/profile/${profile.username}`}>
        <Image src={profile.image||'/assets/user.png'}></Image>
        <CardContent>
            <CardHeader>
                {profile.displayName}
            </CardHeader>
            <Card.Description>
                Bio goes here
            </Card.Description>
        </CardContent>
        <CardContent extra>
            <Icon name='user'></Icon>
            20 followers
        </CardContent>
    </Card>
  )
}

export default ProfileCard