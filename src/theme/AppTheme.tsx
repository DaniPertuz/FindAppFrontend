import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    alignItemsCenter: {
        alignItems: 'center'
    },
    label: {
        color: '#2F2F2F',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20,
        marginBottom: 5,
        marginTop: 20
    },
    inputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        borderColor: '#2F2F2F',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row'
    },
    updateInputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row'
    },
    disabledInputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(222, 222, 222, 1)',
        borderColor: '#858585',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row'
    },
    inputField: {
        color: '#2F2F2F',
        fontSize: 16,
        letterSpacing: -0.24,
        lineHeight: 16,
        padding: 16
    },
    inputFieldIOS: {
        lineHeight: 19
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        padding: 10,
        width: '100%'
    },
    buttonSearch: {
        backgroundColor: '#5856D6',
        borderColor: '#5856D6',
        borderRadius: 999,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 18
    },
    buttonSearchContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 30
    },
    buttonText: {
        color: 'rgba(250, 250, 250, 0.98)',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
        letterSpacing: -0.32
    },
    buttonSearchText: {
        fontSize: 22,
        color: '#FFFFFF',
        fontFamily: 'Nunito-Regular',
        fontWeight: '700'
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 35,
        marginHorizontal: 20,
        marginTop: 74,
        minHeight: 720,
        paddingHorizontal: 22
    },
    mainScreenContainer: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20
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
        borderColor: '#081023',
        borderRadius: 100,
        borderWidth: 2.5,
        marginTop: 25,
        height: 140,
        width: 140
    },
    profileScreenContainer: {
        flex: 1
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
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
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
    rowSpaceBetweenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    blackPrimaryFontStyle: {
        color: '#000000',
        fontFamily: 'Nunito-Regular',
        fontSize: 18
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
    listItemContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    itemIcon: {
        borderRadius: 8,
        flex: 1,
        height: 42,
        width: 42
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
    },
    detailsMainTopContainer: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 30
    },
    detailsTopContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    detailsNameContainer: {
        flex: 1,
        maxHeight: 70,
        marginEnd: 10
    },
    detailsContactContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    detailsContactBetweenContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailsContactEvenlyContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    detailsIcon: {
        borderRadius: 100,
        height: 90,
        width: 90
    },
    detailsCarouselPicture: {
        borderRadius: 5,
        height: '100%',
        resizeMode: 'contain',
        width: '100%'
    },
    detailsCarouselContainer: {
        flex: 3,
        marginBottom: 20
    },
    detailsCarousel: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    detailsDescription: {
        flex: 1,
        marginBottom: 10,
        maxHeight: 70
    },
    detailsDropdown: {
        flex: 2,
        maxHeight: 50,
        borderBottomColor: '#4B4D4B',
        borderBottomWidth: 0.5,
        marginEnd: 20
    },
    detailsDropdownRateContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        maxHeight: 60
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    rowJustifyCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    resultsCenterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    reviewsImage: {
        borderRadius: 10,
        flex: 1,
        height: 60,
        width: 60
    },
    tempPhoto: {
        alignSelf: 'center',
        marginTop: 25,
        height: 170,
        width: '40%'
    }
});

const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 2,
        paddingHorizontal: 30,
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
    },
    backgroundColorContainer: {
        backgroundColor: '#207CFD',
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 16,
        height: 230,
        position: 'absolute',
        width: '100%',
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