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

    const slides = [
        {
            image: require('../assets/Welcome1.png'),
            title: 'Scan Products',
            subtitle: 'to make better choices for you and the planet'
        },
        {
            image: require('../assets/Welcome2.png'),
            title: 'Learn from experts',
            subtitle: 'through  free and high-level contents in your feed'
        },
        {
            image: require('../assets/Welcome3.png'),
            title: 'Save the planet',
            subtitle: 'while living a sustainable and healthy lifestyle'
        }
    ];

    const selectedPos = useSharedValue(0);
    const ovals = [
        {
            orig: 32,
            pos: useSharedValue(32),
        },
        {
            orig: 46,
            pos: useSharedValue(46),
        }
    ]

    const selectedAnimation = useAnimatedStyle(() => {
        return {
            left: selectedPos.value,
        };
    });

    
    const nextSlide = () => {
        let old = currentSlide.current
        currentSlide.current = currentSlide.current == slides.length-1 ? 0 : currentSlide.current+1;
        selectedPos.value = withSpring(currentSlide.current * 14, {
            damping: 13,
            mass: 1,
            stiffness: 100
        });
        if (currentSlide.current > old) {
            ovals[currentSlide.current-1].pos.value = withSpring(ovals[currentSlide.current-1].orig - 32, {
                damping: 13,
                mass: 1,
                stiffness: 100
            });
        } else {
            ovals.forEach((oval) => {
                oval.pos.value = withSpring(oval.orig, {
                    damping: 13,
                    mass: 1,
                    stiffness: 100
                })
            })
        }
    }

    const click = () => {
        nextSlide();
    }

    return (
        <View>
            <Image 
                style={styles.backgroundImage}
                source={images[0]}
            />
            <View style={styles.content}>
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
                <Reanimated.View style={[
                    styles.selected,
                    selectedAnimation,
                    {backgroundColor: 'rgba(255, 255, 255, 1)'},
                ]}/>
                {ovals.map((_, index) => {
                    return (
                        <Reanimated.View
                            key={`oval_${index}`} 
                            style={[
                                styles.oval,
                                {backgroundColor: 'rgba(255, 255, 255, 0.6)'},
                                useAnimatedStyle(() => {
                                    return {
                                        left: ovals[index].pos.value
                                    }
                                })
                            ]}
                        />
                    )
                })}
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