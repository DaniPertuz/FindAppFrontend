import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Rating } from 'react-native-ratings';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { RootStackParams } from '../../navigation';
import { ProductsContext, RatingContext } from '../../context';
import { IProduct } from '../../interfaces/app-interfaces';

import { styles } from '../../theme/AppTheme';
import LoadingScreen from '../LoadingScreen';

interface Props extends StackScreenProps<RootStackParams, 'ProductReviewsScreen'> { };

const ProductReviewsScreen = ({ route }: Props) => {

    const { top } = useSafeAreaInsets();

    const { product } = route.params;

    const { ratings, getRatings } = useContext(RatingContext);
    const { loadProductByID } = useContext(ProductsContext);

    const [productInfo, setProductInfo] = useState<IProduct>();

    const getPlace = async () => {
        const data = await loadProductByID(product);
        setProductInfo(data);
        console.log(data)
    };

    useEffect(() => {
        getPlace();
        getRatings(product);
    }, [product]);

    return (
        <>
            {(product !== productInfo?._id)
                ? <LoadingScreen />
                : <>
                    {(ratings.total === 0)
                        ?
                        <View style={{ marginTop: top, alignItems: 'center' }}>
                            <Text style={styles.blackTitle}>{productInfo?.name}</Text>
                            <Text style={styles.secondaryFontStyle}>No hay opiniones</Text>
                        </View>
                        : <>
                            <View style={{ marginTop: top, alignItems: 'center' }}>
                                <Text style={styles.blackTitle}>{productInfo?.name}</Text>
                                <Text style={styles.blackTitle}>{productInfo.rate.$numberDecimal}</Text>
                                <Text style={styles.secondaryFontStyle}>{ratings.total} opiniones</Text>
                            </View>
                            <View style={{ flex: 10 }}>
                                <FlatList
                                    data={ratings.rates}
                                    renderItem={({ item }) => (
                                        <View
                                            style={{ flex: 1, margin: 20 }}
                                        >
                                            <View
                                                style={{ flexDirection: 'row' }}
                                            >
                                                <Image
                                                    style={styles.reviewsImage}
                                                    source={(item.user?.photo === '')
                                                        ? require('../../assets/placeholder.png')
                                                        : { uri: item.user?.photo }}
                                                />
                                                <View style={{ flex: 5, paddingHorizontal: 10 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.blackPrimaryFontStyle}>
                                                            {((item.user?.name!).length > 18) ?
                                                                (((item.user?.name!).substring(0, 18)) + '...') :
                                                                item.user?.name}
                                                        </Text>
                                                        <Text style={styles.secondaryFontStyle}>
                                                            {moment(item.createdAt, "YYYYMMDD").fromNow()}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                        <Rating
                                                            fractions={2}
                                                            imageSize={20}
                                                            minValue={1}
                                                            ratingBackgroundColor='#FFFFFF'
                                                            ratingCount={5}
                                                            ratingTextColor='#5856D6'
                                                            readonly
                                                            showReadOnlyText={false}
                                                            startingValue={item.rate}
                                                            style={{ marginEnd: 5 }}
                                                            tintColor='#FFFFFF'
                                                            type='star'
                                                        />
                                                        <Text style={styles.secondaryFontStyle}>
                                                            ({item.rate.toFixed(1)})
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {(item.comments !== '') &&
                                                <View>
                                                    <Text style={styles.secondaryFontStyle}>
                                                        {item.comments}
                                                    </Text>
                                                </View>
                                            }
                                        </View>
                                    )}
                                />
                            </View>
                        </>
                    }
                </>
            }
        </>
    );
};

export default ProductReviewsScreen;