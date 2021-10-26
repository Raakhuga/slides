import React, { useRef } from 'react';
import fontStyles from '../styles/FontStyles';
import colorStyles from '../styles/ColorStyles';
import Reanimated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Dimensions, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

const Slides = () => {
    
    const images = [
        require('../assets/Welcome1.png'),
        require('../assets/Welcome2.png'),
        require('../assets/Welcome3.png')
    ];

    const currentSlide = useRef(0);

    const selectedPos = useSharedValue(0);
    const oval1Pos = useSharedValue(0);
    const oval2Pos = useSharedValue(0);

    const selectedPositions: number[] = [0, 14, 28];
    const oval1Positions: number[] = [32, 0, 0];
    const oval2Positions: number[] = [46, 46, 14];

    const selectedAnimation = useAnimatedStyle(() => {
        return {
            left: selectedPos.value,
        };
    });

    const oval1Animation = useAnimatedStyle(() => {
        return {
            left: oval1Pos.value,
        };
    });

    const oval2Animation = useAnimatedStyle(() => {
        return {
            left: oval2Pos.value,
        };
    });
    
    const click = () => {
        let old = currentSlide.current
        currentSlide.current = currentSlide.current == 2 ? 0 : currentSlide.current+1;
        selectedPos.value = withSpring(selectedPositions[currentSlide.current], {
            damping: 13,
            mass: 1,
            stiffness: 100
        });
        if (oval1Positions[old] != oval1Positions[currentSlide.current]) oval1Pos.value = withSpring(oval1Positions[currentSlide.current], {
            damping: 13,
            mass: 1,
            stiffness: 100
        });
        if (oval2Positions[old] != oval2Positions[currentSlide.current]) oval2Pos.value = withSpring(oval2Positions[currentSlide.current], {
            damping: 13,
            mass: 1,
            stiffness: 100
        });
    }

    return (
        <View>
            <Image 
                style={styles.backgroundImage}
                source={images[0]}
            />
            <View style={[
                styles.content,
                {borderColor: 'red', borderWidth: 1}]}>
                <Text style={[
                    fontStyles.title1,
                    fontStyles.medium,
                    colorStyles.whiteOpacity100,
                    styles.title,
                    {borderColor: 'red', borderWidth: 1}
                ]}>Scan Products</Text>
                <Text style={[
                    styles.subtitle,
                    fontStyles.title3,
                    colorStyles.whiteOpacity60,                    
                    {borderColor: 'red', borderWidth: 1}
                ]}>to make better choices for you and the planet {currentSlide.current}</Text>
            </View>
            <View style={[
                styles.components,
            ]}>
                <Reanimated.View style={[
                    styles.selected,
                    selectedAnimation,
                    {backgroundColor: 'rgba(255, 255, 255, 1)'},
                ]}/>
                <Reanimated.View style={[
                    styles.oval,
                    {backgroundColor: 'rgba(255, 255, 255, 0.6)'},
                    oval1Animation
                ]}/>
                <Reanimated.View style={[
                    styles.oval,
                    {backgroundColor: 'rgba(255, 255, 255, 0.6)'},
                    oval2Animation
                ]}/>
            </View>
            <TouchableOpacity style={{
                position:'absolute',
                width: 30, 
                height: 30, 
                alignSelf: 'center',
                backgroundColor: 'red'
            }} onPress={click}/>
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