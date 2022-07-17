import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import SubjectPage from './pages/subjectPage/subjectPage';
import {
  HomeIcon,
  NoticeIcon,
  ProfileIcon,
  ScanIcon,
  SubjectsIcon,
} from '@univ-project/ui';
import Tab4 from './pages/Tab4';
import SignInPage from './pages/sign-in/signIn';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

// /* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LecturePage from './pages/lecturePage/lecturePage';
import ScanTab from './pages/ScanTab';
import SchedulePage from './pages/schedulePage/schedulePage';
import PublicRoute from './components/public-route/public-route';
import PrivateRoute from './components/private-route/private-route';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <PublicRoute path="/signIn" component={SignInPage} exact />
            <PrivateRoute path="/tab1" component={Tab1} />
            <PrivateRoute path="/tab2" component={Tab2} />
            <PrivateRoute path="/tab3" component={Tab3} />
            <PrivateRoute path="/tab4" component={Tab4} />
            <PrivateRoute path="/subjectPage" component={SubjectPage} />
            <PrivateRoute path="/lecturePage" component={LecturePage} />
            <PrivateRoute path="/scan" component={ScanTab} />
            <PrivateRoute path="/schedulePage" component={SchedulePage} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Home" href="/tab1">
              {/* <IonIcon icon={triangle} /> */}
              <HomeIcon type="outlined" />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Subjects" href="/tab2">
              {/* <IonIcon icon={ellipse} /> */}
              <SubjectsIcon type="outlined" />
              <IonLabel>Subjects</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Notice" href="/tab3">
              {/* <IonIcon icon={square} /> */}
              <NoticeIcon type="outlined" />
              <IonLabel>Notice</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Profile" href="/tab4">
              {/* <IonIcon icon={square} /> */}
              <ProfileIcon type="outlined" />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            <IonTabButton tab="scan" href="/scan">
              <ScanIcon type="outlined" />
              <IonLabel>Scan</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
