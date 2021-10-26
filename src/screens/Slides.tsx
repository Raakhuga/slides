import React from 'react';
import fontStyles from '../styles/FontStyles';
import colorStyles from '../styles/ColorStyles';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

const Slides = () => {
    
    const images = [
        require('../assets/Welcome1.png'),
        require('../assets/Welcome2.png'),
        require('../assets/Welcome3.png')
    ];

    return (
        <View>
            <Image 
                style={styles.backgroundImage}
                source={images[0]}
            />
            <View style={[styles.content]}>
                <Text style={[
                    fontStyles.title1,
                    fontStyles.medium,
                    colorStyles.whiteOpacity100,
                    styles.title,
                ]}>Scan Products</Text>
                <Text style={[
                    styles.subtitle,
                    fontStyles.title3,
                    colorStyles.whiteOpacity60,
                ]}>to make better choices for you and the planet</Text>
            </View>
            <View style={[
                styles.components,
            ]}>
                <View style={[
                    styles.selected,
                    {backgroundColor: 'rgba(255, 255, 255, 1)'},
                ]}/>
                <View style={[
                    styles.oval,
                    {backgroundColor: 'rgba(255, 255, 255, 0.6)', left: 32},
                ]}/>
                <View style={[
                    styles.oval,
                    {backgroundColor: 'rgba(255, 255, 255, 0.6)', left: 46},
                ]}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'relative',
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    content: {
        position: 'absolute',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width - 80,
        bottom: 126
    },
    title: {
        flex: 0,
        height: 39,
        textAlign: 'center'
    },
    subtitle: {
        flex: 0,
        height: 56,
        textAlign: 'center'
    },
    components: {
        position: 'absolute',
        width: 52,
        height: 6,
        bottom: 64,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    oval: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4
    },
    selected: {
        position: 'absolute',
        left: 0,
        width: 24,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4
    }
});

export default Slides;