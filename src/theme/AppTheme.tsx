import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    alignContentCenter: {
        alignContent: 'center'
    },
    alignItemsBaseline: {
        alignItems: 'baseline'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    alignItemsJustifyContentCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    askLocationButtonContainer: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    backButtonMargins: {
        marginBottom: 22,
        marginEnd: 2,
        marginTop: 2
    },
    backButtonText: {
        color: '#207CFD',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    boldLargeText: {
        color: '#081023',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -0.4,
        lineHeight: 28
    },
    boldMediumText: {
        color: '#081023',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18
    },
    bottomTabNavigatorItem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    bottomTabNavigatorItemFont: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    bottomTabNavigatorLabStyle: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: -0.28
    },
    bottomTabNavigatorMinHeight: {
        minHeight: 62
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        padding: 10,
        width: '100%'
    },
    buttonText: {
        color: 'rgba(250, 250, 250, 0.98)',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
        letterSpacing: -0.32
    },
    buttonContainerMarginTop: {
        marginTop: 30
    },
    createAccountButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 38,
        marginTop: 32
    },
    description: {
        color: '#081023',
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: -0.24,
        lineHeight: 16
    },
    detailsCarousel: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    detailsCarouselContainer: {
        flex: 3,
        paddingVertical: 20
    },
    detailsCarouselPicture: {
        borderRadius: 5,
        height: '100%',
        resizeMode: 'contain',
        width: '100%'
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
    detailsIcon: {
        borderRadius: 8,
        height: 102,
        width: 102
    },
    detailsMainName: {
        color: '#081023',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.4,
        lineHeight: 28
    },
    detailsBodyLink: {
        color: '#207CFD',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 22
    },
    detailsBodyText: {
        color: '#0D0D0D',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 22
    },
    detailsCaptionText: {
        color: '#207CFD',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 15
    },
    detailsCaptionGrayText: {
        color: '#5A5A5A',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20,
        textAlign: 'center'
    },
    disabledInputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(222, 222, 222, 1)',
        borderColor: '#858585',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    editProfileButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginStart: 6,
        padding: 5
    },
    editProfileGalleryButton: {
        borderColor: 'rgba(133, 133, 133, 0.25)',
        borderRadius: 30,
        borderWidth: 1,
        padding: 10
    },
    editProfileIconMargins: {
        marginEnd: 6,
        marginTop: 2
    },
    editProfileMediumText: {
        color: '#081023',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    editProfileModal: {
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        height: '20%',
        top: '80%',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    editProfileModalBackButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    editProfilePhotoButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginStart: -40,
        marginTop: 125,
        maxHeight: 40,
        padding: 5
    },
    editProfileScrollView: {
        flex: 2,
        marginTop: 10,
        paddingHorizontal: 30
    },
    editProfileUserNameText: {
        color: '#081023',
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: -0.48,
        lineHeight: 28
    },
    extraSmallMarginTop: {
        marginTop: 8
    },
    extraTinyButtonSize: {
        flex: 0.1
    },
    extraTinyMarginTop: {
        marginTop: 3
    },
    favoriteItemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    favoriteItemDetailsContainer: {
        flex: 5,
        marginHorizontal: 12
    },
    favoriteScreenContainer: {
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 70
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    flexDirectionRowAlignItemsCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexDirectionRowAlignJustifyCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexDirectionRowJustifyAround: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    flexDirectionRowJustifyCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flexDirectionRowJustifySpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexDirectionRowMarginTop: {
        flexDirection: 'row',
        marginTop: 18
    },
    flexDirectionRowTinyMarginTop: {
        flexDirection: 'row',
        marginTop: 5
    },
    flexNineAlignItemsCenter: {
        alignItems: 'center',
        flex: 9
    },
    flexOne: {
        flex: 1
    },
    flexTwo: {
        flex: 2
    },
    flexThree: {
        flex: 3
    },
    flexOneAlignItemsCenter: {
        alignItems: 'flex-start',
        flex: 1
    },
    flexOneAlignJustifyCenter: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    flexOneDirectionRow: {
        flex: 1,
        flexDirection: 'row'
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 30,
        marginTop: 12
    },
    forgotPasswordText: {
        color: '#207CFD',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 15
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
    fullHeight: {
        height: '100%'
    },
    grayLabel: {
        color: '#858585',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    iconStartMargin: {
        marginStart: 16
    },
    infoText: {
        color: '#081023',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: -0.36,
        textAlign: 'center'
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
    inputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        borderColor: '#2F2F2F',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    itemDetailsIconMarginEnd: {
        marginEnd: 6
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    itemIcon: {
        borderRadius: 8,
        height: 42,
        width: 42
    },
    justifyAlignItemsCenter: {
        alignItems: 'center',
        justifyContent: 'center'
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
    largeItem: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginHorizontal: 8,
        minWidth: 90,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    largeItemText: {
        color: '#0D0D0D',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    largeMarginTop: {
        marginTop: 28
    },
    largePaddingBottom: {
        paddingBottom: 40
    },
    largePaddingHorizontal: {
        paddingHorizontal: 40
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
    loginBackground: {
        backgroundColor: '#207CFD',
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 16,
        height: 230,
        position: 'absolute',
        width: '100%'
    },
    loginButtonText: {
        color: '#207CFD',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 20
    },
    logOutText: {
        color: '#D13232',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 15
    },
    justifyContentFlexStart: {
        justifyContent: 'flex-start'
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between'
    },
    mainLogo: {
        height: 107,
        marginBottom: 33,
        marginHorizontal: 98,
        marginTop: 40,
        width: 239
    },
    mainScreenContainer: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20
    },
    mapAddress: {
        color: '#858585',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 15
    },
    mapBackButtonPosition: {
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderRadius: 8,
        left: 21,
        padding: 10,
        position: 'absolute',
        right: 277,
        top: 58,
        zIndex: 999
    },
    mapBackButtonText: {
        color: '#207CFD',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    mapDirectionsBackground: {
        alignItems: 'center',
        backgroundColor: '#DEDEDE',
        flexDirection: 'row',
        paddingHorizontal: 6,
        paddingVertical: 9
    },
    mapDuration: {
        color: '#292D32',
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: -0.56,
        lineHeight: 32
    },
    mapFollowArrivalTime: {
        color: '#292D32',
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: -0.56,
        lineHeight: 32,
        textAlign: 'center'
    },
    mapFollowModal: {
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        height: '20%',
        top: '73%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    mapFollowSmallText: {
        color: '#0D0D0D',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 15,
        textAlign: 'center'
    },
    mapNavigationButton: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6
    },
    mapNavigationButtonText: {
        color: 'rgba(250, 250, 250, 0.98)',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 32
    },
    mapNavigationModal: {
        backgroundColor: 'rgba(250, 250, 250, 1)',
        height: '20%',
        top: '80%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    mapFollowButton: {
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderRadius: 30,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.22,
        elevation: 2
    },
    marginHorizontalSmall: {
        marginHorizontal: 8
    },
    mediumLargeMarginTop: {
        marginTop: 23
    },
    mediumMarginBottom: {
        marginBottom: 20
    },
    mediumMarginStart: {
        marginStart: 10
    },
    mediumMarginTop: {
        marginTop: 20
    },
    modalBackButtonMargins: {
        marginEnd: 10,
        marginTop: 10
    },
    newPasswordInputTextSize: {
        flex: 2
    },
    noUserPhoto: {
        height: 50,
        borderColor: '#081023',
        borderRadius: 50,
        borderWidth: 1,
        width: 50
    },
    noUserPhotoBackground: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderRadius: 50,
        flex: 1,
        justifyContent: 'center'
    },
    placeholderText: {
        color: '#858585',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    placeRateContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16,
        maxWidth: 191
    },
    plainBodySmallText: {
        color: '#081023',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    plainMediumText: {
        color: '#081023',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    plainSmallText: {
        color: '#081023',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    primaryBlackBackground: {
        backgroundColor: 'rgba(31, 39, 58, 0.95)'
    },
    productPlaceName: {
        color: '#081023',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: -0.24,
        lineHeight: 16
    },
    resultsNavigationButton: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 4,
        margin: 10,
        paddingVertical: 1
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
    rateButton: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    rateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 22
    },
    rateItemUserName: {
        color: '#0D0D0D',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18
    },
    rateItemAvg: {
        color: '#0D0D0D',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 18
    },
    rateItemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 24,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    rateItemDate: {
        color: '#858585',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20,
        textAlign: 'right'
    },
    rateNumber: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8.7,
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 9
    },
    ratesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    ratesCommentsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderColor: '#081023',
        borderWidth: 1,
        padding: 16
    },
    ratesCommentsText: {
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: -0.24,
        lineHeight: 16
    },
    ratesReviewsTextContainer: {
        justifyContent: 'center',
        marginStart: 6,
        marginTop: 3
    },
    registerLockIconSize: {
        flex: 0.2,
        marginStart: 16
    },
    registerHideButtonSize: {
        flex: 0.1,
        marginEnd: 16
    },
    registerBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 60
    },
    registerPasswordTextInputSize: {
        flex: 2,
        marginEnd: 10
    },
    reviewsModal: {
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        height: '95%',
        top: '13%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    reviewsModalTitle: {
        color: '#1F273A',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 22,
        textAlign: 'center'
    },
    rowSpaceBetweenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scrollViewBackground: {
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        flex: 1,
        paddingBottom: 40
    },
    searchButton: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    searchButtonMargins: {
        marginTop: 21,
        paddingHorizontal: 22
    },
    searchButtonText: {
        color: 'rgba(250, 250, 250, 0.98)',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 22
    },
    searchMarginTop: {
        marginTop: 35
    },
    searchScreenContainer: {
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        flex: 1,
        paddingHorizontal: 20
    },
    smallMarginBottom: {
        marginBottom: 8
    },
    smallMarginStart: {
        marginStart: 6
    },
    smallMarginTop: {
        marginTop: 10
    },
    smallMediumMarginBottom: {
        marginBottom: 12
    },
    smallMediumMarginTop: {
        marginTop: 12
    },
    smallPlainText: {
        color: '#1F273A',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 15
    },
    stackScreenContainer: {
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        flex: 1,
        paddingHorizontal: 16
    },
    stackScreenTitle: {
        color: '#1F273A',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    startNavigationButton: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    startNavigationButtonText: {
        color: '#FAFAFA',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 22
    },
    tinyButtonSize: {
        flex: 0.2
    },
    tinyMarginBottom: {
        marginBottom: 5
    },
    tinyMarginEnd: {
        marginEnd: 3
    },
    tinyMarginStart: {
        marginStart: 3
    },
    tinyMarginTop: {
        marginTop: 6
    },
    titleMarginTopContainer: {
        marginTop: 36
    },
    topInputTextBackground: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderRadius: 8,
        flex: 5,
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginEnd: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    topContainer: {
        flex: 1,
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        paddingHorizontal: 10
    },
    updateInputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    updateProfileBackground: {
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        flex: 1
    },
    updateProfileLabel: {
        color: '#081023',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    updateProfileLargeMarginTop: {
        marginTop: 37
    },
    userPhoto: {
        borderRadius: 50,
        height: 50,
        width: 50
    },
    userPhotoBackground: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        borderColor: '#081023',
        borderRadius: 50,
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center'
    },
    warningBorder: {
        borderColor: '#D13232',
        borderWidth: 1
    },
    warningIconMargins: {
        marginEnd: 5,
        marginTop: 3
    },
    warningTopMargin: {
        marginTop: 4
    },
    warningText: {
        color: '#D13232',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    welcomeSubtitleText: {
        color: '#2F2F2F',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    welcomeTitleText: {
        color: '#2F2F2F',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -0.4,
        lineHeight: 28
    }
});

export {
    styles
};