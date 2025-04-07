import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/user/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profile/ProfilePage";
function App() {
  const location = useLocation();
  const {userStore,commonStore}=useStore();

  useEffect(() => {
      if (commonStore.token) {
        userStore.getUser().finally(()=>commonStore.setappLoaded())
      }
      else{
        commonStore.setappLoaded();
      }
  }, [commonStore,userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content="Loading app..."></LoadingComponent>

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar></ToastContainer>
      <ModalContainer/>
      <Route exact path="/" component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact
                  path="/activities"
                  component={ActivityDashboard}
                ></Route>
                <Route
                  exact
                  path="/activities/:id"
                  component={ActivityDetails}
                ></Route>
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                ></Route>
                <Route exact path="/errors" component={TestErrors}></Route>
                <Route exact path="/profiles/:username" component={ProfilePage}></Route>
                <Route exact path="/server-error" component={ServerError}></Route>
                <Route exact path="/login" component={LoginForm}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
