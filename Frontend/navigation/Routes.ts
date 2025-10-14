export enum Routes {
    Home = 'Home',
    HomeTab = 'HomeTab',
    Details = 'Details',
    Login = 'Login'
}


export type RootStackParamList = {
    [Routes.Home]: undefined;
    [Routes.HomeTab]: undefined;
    [Routes.Details]: { itemId: number };
    [Routes.Login]: undefined;
};