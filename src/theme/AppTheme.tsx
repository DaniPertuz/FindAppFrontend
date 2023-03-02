import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginTop: 25,
        color: '#FFFFFF',
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
    inputField: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
    inputFieldIOS: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderRadius: 999,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 18
    },
    buttonSearch: {
        backgroundColor: '#5856D6',
        borderColor: '#5856D6',
        borderRadius: 999,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 18
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    buttonText: {
        fontSize: 22,
        color: '#5856D6',
        fontFamily: 'Nunito-Regular',
        fontWeight: '700'
    },
    buttonSearchText: {
        fontSize: 22,
        color: '#FFFFFF',
        fontFamily: 'Nunito-Regular',
        fontWeight: '700'
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        height: 500
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginBottom: 15,
        marginEnd: 15
    },
    title: {
        color: '#FFFFFF',
        fontSize: 60,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center'
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center'
    },
    avatar: {
        borderRadius: 100,
        height: 120,
        width: 120
    },
    avatarContainer: {
        alignItems: 'center',
        height: 900,
        marginVertical: 10
    },
    drawerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    drawerIcon: {
        alignSelf: 'center',
        marginEnd: 10
    },
    drawerUserEmail: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Nunito-Light',
        marginTop: 10
    },
    drawerUsername: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
        marginTop: 10
    },
    drawerHr: {
        borderWidth: 0.5,
        borderBottomColor: '#5856D6',
        margin: 10,
        alignSelf: 'stretch'
    },
    drawerMainContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '85%'
    },
    drawerOptions: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
        marginVertical: 15
    },
    drawerLogout: {
        alignSelf: 'center',
        top: 650,
        marginBottom: 10,
        position: 'absolute',
        backgroundColor: '#5856D6',
        borderColor: '#5856D6',
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    drawerLogoutButton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600'
    },
    topContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    blackTitle: {
        alignSelf: 'center',
        color: '#000000',
        fontFamily: 'Nunito-Regular',
        fontSize: 30,
        marginHorizontal: 10,
        marginTop: 20
    },
    searchListItemContainer: {
        backgroundColor: '#EBEBEB',
        borderColor: '#5856D6',
        borderRadius: 20,
        borderWidth: 4,
        display: 'flex',
        flexDirection: 'column',
        height: 52,
        marginHorizontal: 16,
        marginVertical: 6,
        paddingHorizontal: 16
    },
    searchListItem: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 7
    },
    searchListItemIcon: {
        borderRadius: 50,
        marginHorizontal: 12,
        height: 30,
        width: 30
    },
    bottomSheetMainContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    bottomSheetContainer: {
        backgroundColor: '#EBEBEB',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        height: 110,
        marginBottom: 5,
        paddingHorizontal: 10,
        width: 440
    },
    bottomSheetTopContainer: {
        alignItems: 'center',
        marginVertical: 5,
        width: 400
    },
    bottomSheetIcon: {
        borderRadius: 50,
        marginStart: 22,
        height: 100,
        width: 100
    },
    bottomSheetDetailsContainer: {
        width: '100%',
        paddingHorizontal: 10
    },
    bottomSheetDetailsSecondaryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    blackPrimaryFontStyle: {
        color: '#000000',
        fontFamily: 'Nunito-Regular',
        fontSize: 18
    },
    bottomSheetDetailsPrimaryFontStyle: {
        color: '#000000',
        fontFamily: 'Nunito-Regular',
        fontSize: 17,
        textTransform: 'uppercase'
    },
    bottomSheetDetailsSecondaryFontStyle: {
        color: '#4b4d4b',
        fontFamily: 'Nunito-Regular',
        fontSize: 15
    },
    favoritesItemContainer: {
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        borderColor: '#5856D6',
        borderRadius: 20,
        borderWidth: 4,
        display: 'flex',
        flexDirection: 'row',
        height: 90,
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 10
    },
    favoriteItemIcon: {
        borderRadius: 50,
        flex: 1,
        height: 65,
        width: 65
    }
});

const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 10,
        paddingHorizontal: 30,
        height: 900,
        marginTop: 100
    },
    decisionContainer: {
        flex: 1,
        marginHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    inputField: {
        color: '#FFFFFF',
        fontSize: 20
    },
    inputFieldIOS: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    buttonImagesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 25
    },
    button: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 100
    },
    buttonSkip: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    }
});

const editStyles = StyleSheet.create({
    title: {
        color: '#5856D6',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: '#5856D6',
        fontWeight: 'bold'
    },
    inputField: {
        color: '#5856D6',
        fontSize: 20
    },
    inputFieldIOS: {
        borderBottomColor: '#5856D6',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        borderWidth: 2,
        borderColor: '#5856D6',
        color: '#5856D6',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 16,
        color: '#5856D6'
    }
});

export {
    editStyles,
    styles,
    loginStyles
};