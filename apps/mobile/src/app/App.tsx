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
import { ScanIcon } from '@univ-project/ui';
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

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/" component={SignInPage} exact />
            <Route path="/tab1" component={Tab1} />
            <Route path="/tab2" component={Tab2} />
            <Route path="/tab3" component={Tab3} />
            <Route path="/tab4" component={Tab4} />
            <Route path="/subjectPage" component={SubjectPage} />
            <Route path="/lecturePage" component={LecturePage} />
            <Route path="/scan" component={ScanTab} />
            <Route path="/schedulePage" component={SchedulePage} />
            {/* <Route */}
            {/* <Route
              path="/"
              render={() => <Redirect to="/tab1" />}
              exact={true}
            /> */}
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Home" href="/tab1">
              <IonIcon icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Subjects" href="/tab2">
              <IonIcon icon={ellipse} />
              <IonLabel>Subjects</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Notice" href="/tab3">
              <IonIcon icon={square} />
              <IonLabel>Notice</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Profile" href="/tab4">
              <IonIcon icon={square} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            <IonTabButton tab="scan" href="/scan">
              {/* <IonIcon> */}
              <ScanIcon type="outlined" />
              {/* </IonIcon> */}
              <IonLabel>Scan</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
