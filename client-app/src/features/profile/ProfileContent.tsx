import React from "react";
import { Tab, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
interface Props {
  profile: Profile | null;
}
function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => 
    (<ProfileAbout profile = {profile} /> )},
    {
      menuItem: "Photos",
      render: () => (
        <ProfilePhotos profile={profile}/>
      ),
    },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}

export default ProfileContent;
