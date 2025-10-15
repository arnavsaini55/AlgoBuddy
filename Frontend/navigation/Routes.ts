export enum Routes {
    Home = 'Home',
    HomeTab = 'HomeTab',
    Details = 'Details',
    Login = 'Login',
    AppTabs = 'AppTabs',
    Problems = 'Problems',
    Profile = 'Profile'
}


export type RootStackParamList = {
    [Routes.Home]: undefined;
    [Routes.HomeTab]: undefined;
    [Routes.Details]: { itemId: number };
    [Routes.Login]: undefined;
    [Routes.AppTabs]: undefined;
    [Routes.Problems]: undefined;
    [Routes.Profile]: undefined;
};