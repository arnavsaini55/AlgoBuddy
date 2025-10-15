export enum Routes {
    Home = "Home",
    HomeTab = 'HomeTab',
    Details = 'Details',
    Login = 'Login',
    AppTabs = 'AppTabs',
    Problems = 'Problems',
    Profile = 'Profile',
    Registration = 'Registration'
}


export type TabParamList = {
    [Routes.Home]: undefined;
    [Routes.Problems]: undefined;
    [Routes.Profile]: undefined;
};

export type RootStackParamList = {
    [Routes.Login]: undefined;
    [Routes.Registration]: undefined;
    [Routes.AppTabs]: undefined;
    [Routes.Details]: { itemId: number };
};
