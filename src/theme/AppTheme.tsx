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
    buttonSearchContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 30
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
    mainScreenContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    mainScreenLogo: {
        width: 120,
        height: 120,
        borderRadius: 100
    },
    mainScreenTitle: {
        color: '#000000',
        fontSize: 32,
        fontFamily: 'Nunito-Bold',
        marginVertical: 30
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
        flex: 3,
        alignItems: 'center',
        paddingTop: 10
    },
    profileAvatar: {
        alignSelf: 'center',
        marginTop: 25,
        height: 170,
        width: '40%'
    },
    profileBottomSheet: {
        backgroundColor: '#EBEBEB',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 10
    },
    profileScreenContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    drawerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    drawerLogoutContainer: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 10
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
        borderWidth: 1,
        borderBottomColor: '#5856D6',
        marginHorizontal: 15
    },
    drawerMainContainer: {
        flex: 7,
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 5,
        paddingHorizontal: 15
    },
    drawerOptions: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
        marginVertical: 15
    },
    largeButton: {
        backgroundColor: '#5856D6',
        borderColor: '#5856D6',
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    largeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600'
    },
    topContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10
    },
    blackTitle: {
        alignSelf: 'center',
        color: '#000000',
        fontFamily: 'Nunito-Regular',
        fontSize: 30,
        marginHorizontal: 10
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
        height: '36%',
        paddingHorizontal: 10,
        width: '95%'
    },
    bottomSheetTopContainer: {
        alignItems: 'center',
        marginVertical: 5,
        width: '95%'
    },
    bottomSheetIcon: {
        borderRadius: 50,
        marginStart: 22,
        height: 100,
        width: 100
    },
    bottomSheetDetailsContainer: {
        width: '95%',
        marginHorizontal: 20,
        paddingHorizontal: 5,
        paddingVertical: 7
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
    secondaryFontStyle: {
        color: '#4B4D4B',
        fontFamily: 'Nunito-Regular',
        fontSize: 15
    },
    linkStyle: {
        color: '#5856D6',
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    favoritesItemContainer: {
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        borderColor: '#5856D6',
        borderRadius: 20,
        borderWidth: 4,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    itemIcon: {
        borderRadius: 10,
        flex: 1,
        height: 45,
        width: 45
    },
    grayContainer: {
        flex: 1,
        backgroundColor: '#F3F4F4',
        marginTop: 30,
        marginBottom: 20,
        padding: 20,
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingsMainContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20
    },
    ratingIcon: {
        borderRadius: 50,
        flex: 1,
        height: 100,
        width: 100
    },
    ratingTitleContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 15
    },
    ratingSubtitleContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ratingColumn: {
        flexDirection: 'column'
    },
    ratingText: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#000000',
        fontFamily: 'Nunito-Regular',
        fontSize: 18
    },
    ratingTextStart: {
        flex: 0.3,
        alignSelf: 'flex-start'
    },
    ratesContainer: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 30
    },
    ratesButton: {
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 20
    },
    commentsContainer: {
        flex: 0.5,
        width: '100%'
    },
    commentsText: {
        color: '#5856D6',
        fontFamily: 'Nunito-Regular',
        fontSize: 15
    },
    ratingSaveButtonContainer: {
        alignItems: 'center',
        flex: 0.5,
        justifyContent: 'center'
    },
    ratingSaveButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: 'Nunito-Regular',
        fontWeight: '700'
    }
});

const loginStyles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 30,
        height: 900,
        marginTop: 10
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