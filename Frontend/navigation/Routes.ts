import Registration from "../screens/Registration/Registration";

export enum Routes {
    Home = "Home",
    HomeTab = 'HomeTab',
    Details = 'Details',
    Login = 'Login',
    AppTabs = 'AppTabs',
    Problems = 'Problems',
    QuestionDetail = 'QuestionDetail',
    Profile = 'Profile',
    Registration = 'Registration',

}


export type TabParamList = {
    [Routes.Home]: undefined;
    [Routes.Problems]: undefined;
    [Routes.Profile]: undefined;
    
};

export type RootStackParamList = {
    [Routes.Login]: undefined;
    [Routes.AppTabs]: undefined;
    [Routes.Details]: { itemId: number };
    [Routes.Home]: undefined;
    [Routes.Registration]: undefined;
    [Routes.QuestionDetail]: { id: string };
};
