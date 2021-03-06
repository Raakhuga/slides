import React, { useEffect, useRef, useState } from 'react';
import fontStyles from '../styles/FontStyles';
import colors from '../styles/Colors';
import Reanimated, { withSpring, useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing, SharedValue} from 'react-native-reanimated';
import { Dimensions, StyleSheet, View, StatusBar } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';


const Slides = () => {

    // Iterator to keep track of the slide that's currently showing
    const currentSlide = useRef(0);

    // Data of all the slides and variables used for animating its components
    const slides = [
        {
            image: {
                src: require('../assets/Welcome1.png'),
                alpha: useSharedValue(1),
                scale: useSharedValue(1),
            },
            title: {
                text: 'Scan Products',
                x: useSharedValue(0),
                alpha: useSharedValue(1),
            },
            subtitle: {
                text:'to make better choices for you and the planet',
                x: useSharedValue(0),
                alpha: useSharedValue(1),
            }
        },
        {
            image: {
                src: require('../assets/Welcome2.png'),
                alpha: useSharedValue(0),
                scale: useSharedValue(0.9),
            },
            title: {
                text: 'Learn from experts',
                x: useSharedValue(Dimensions.get('window').width),
                alpha: useSharedValue(0),
            },
            subtitle: {
                text:'through  free and high-level contents in your feed',
                x: useSharedValue(Dimensions.get('window').width),
                alpha: useSharedValue(0),
            }
        },
        {
            image: {
                src: require('../assets/Welcome3.png'),
                alpha: useSharedValue(0),
                scale: useSharedValue(0.9),
            },
            title: {
                text: 'Save the planet',
                x: useSharedValue(Dimensions.get('window').width),
                alpha: useSharedValue(0),
            },
            subtitle: {
                text:'while living a sustainable and healthy lifestyle',
                x: useSharedValue(Dimensions.get('window').width),
                alpha: useSharedValue(0),
            }
        }
    ];

    // Variable to animate the selected component
    const selectedPos = useSharedValue(0);
    // Variables to animate the ovals of the pagination component
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

    // Animation of the selected component
    const selectedAnimation = useAnimatedStyle(() => {
        return {
            left: selectedPos.value,
        };
    });

    // Function to change the images with its corresponding animation
    const changeImage = (old: number, act: number) => {
        
        slides[old].image.alpha.value = withTiming(0, {duration:400});
        slides[act].image.alpha.value =  withTiming(1, {duration:400});
        
        if (act > old) { // Detect the direction of the movement
            slides[old].image.scale.value = withTiming(1.1, {duration:400});
            slides[act].image.scale.value = 1;
        } else {
            slides[act].image.scale.value = 1.1;
            slides[act].image.scale.value = withTiming(1, {duration:400});
        }
    }

    // Spring animation settings for the pagination components
    const paginationSpring =  {
        damping: 13,
        mass: 1,
        stiffness: 100
    }

    // Funciton to move the selected component of the pagination component
    const moveSelected = (act: number) => {
        selectedPos.value = withSpring(act * 14, paginationSpring);
    }

    // Function to move the ovals of the pagination component right to left
    const nextPagination = (old: number, act: number) => {
        if (act > old) { 
            ovals[act-1].pos.value = withSpring(ovals[act-1].orig - 32, paginationSpring);
        } else {
            ovals.forEach((oval) => {
                oval.pos.value = withSpring(oval.orig, paginationSpring)
            })
        }
    }

    // Function to move the ovals of the pagination component left to right
    const prevPagination = (old: number, act: number) => {
        if (act < old) {
            ovals[act].pos.value = withSpring(ovals[act].orig, paginationSpring);
        } else {
            ovals.forEach((oval) => {
                oval.pos.value = withSpring(oval.orig - 32, paginationSpring)
            })
        }
    }

    // Function to animate the movement of the text
    const moveText = (old: number, act: number) => {
        // Settings for the animations
        const textOutDuration = 160;
        const textOutOpacityDuration = 100;

        const textInOpacityDuration = 200;
        const textInSpring = {
            damping: 14,
            mass: 1,
            stiffness: 100
        };
        const subtitleInDelay = 40;

        let direction: number = 1;
        if (act < old) direction = -1

        // Moving the title and subtitle that are going to desappear
        slides[old].title.x.value = withTiming(direction * -Dimensions.get('window').width, {
            easing: Easing.inOut(Easing.linear),
            duration: textOutDuration   
        });
        slides[old].subtitle.x.value = withTiming(direction * -Dimensions.get('window').width, {
            easing: Easing.inOut(Easing.linear),
            duration: textOutDuration   
        });
        
        slides[old].title.alpha.value = withTiming(0, {
            easing: Easing.inOut(Easing.linear),
            duration: textOutOpacityDuration
        });
        slides[old].subtitle.alpha.value = withTiming(0, {
            easing: Easing.inOut(Easing.linear),
            duration: textOutOpacityDuration
        });
        
        // Setting the initial position of the title and subtitle that are going to appear
        slides[act].title.x.value = direction * Dimensions.get('window').width;
        slides[act].subtitle.x.value = direction * Dimensions.get('window').width;

        // Bringing the title and subtitle that are going to appear to the center and showing them
        slides[act].title.x.value = withSpring(0, textInSpring);
        slides[act].subtitle.x.value = withDelay(subtitleInDelay,withSpring(0, textInSpring));
        slides[act].title.alpha.value = withTiming(1, {
            easing: Easing.inOut(Easing.exp),
            duration: textInOpacityDuration
        });
        slides[act].subtitle.alpha.value = withDelay(subtitleInDelay, withTiming(1, {
            easing: Easing.inOut(Easing.exp),
            duration: textInOpacityDuration
        }));
    }
    
    // Function to call all the needed animations to move slides right to left
    const nextSlide = () => {
        let old = currentSlide.current;
        currentSlide.current = currentSlide.current == slides.length-1 ? 0 : currentSlide.current+1;
        moveSelected(currentSlide.current);
        nextPagination(old, currentSlide.current);
        moveText(old, currentSlide.current);
        changeImage(old, currentSlide.current);
    }
   
    // Function to call all the needed animations to move slides left to right
    const prevSlide = () => {
        let old = currentSlide.current;
        currentSlide.current = currentSlide.current == 0 ? slides.length-1 : currentSlide.current-1;
        moveSelected(currentSlide.current);
        prevPagination(old, currentSlide.current);
        moveText(old, currentSlide.current);
        changeImage(old, currentSlide.current);
    }

    // Configuration of the gesture recognizer
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer 
            style={styles.container} 
            onSwipeRight={prevSlide} 
            onSwipeLeft={nextSlide} 
            config={config}
            >
            <StatusBar translucent={true} backgroundColor='transparent'/>
                {slides.map((_, index) => {
                    return (
                        <Reanimated.Image
                            key={`bg_${index}`}
                            style={[
                                styles.backgroundImage,
                                useAnimatedStyle(() => {
                                    return {
                                        opacity: slides[index].image.alpha.value,
                                        transform: [{scale: slides[index].image.scale.value}]
                                    }
                                })
                            ]}
                            source={slides[index].image.src}
                        />
                    );
                })}
                {slides.map((_, index) => {
                    return (
                        <View style={styles.content} key={`content_${index}`}>
                            <Reanimated.Text
                                key={`title_${index}`}
                                style={[
                                    fontStyles.title1,
                                    fontStyles.medium,
                                    styles.title,
                                    useAnimatedStyle(() => {
                                        return {
                                            transform: [{translateX: slides[index].title.x.value}],
                                            opacity: slides[index].title.alpha.value,
                                        }
                                    })
                                ]}
                            >{slides[index].title.text}</Reanimated.Text>
                            <Reanimated.Text
                                key={`subtitle_${index}`}
                                style={[
                                    styles.subtitle,
                                    fontStyles.title3,
                                    useAnimatedStyle(() => {
                                        return {
                                            transform: [{translateX: slides[index].subtitle.x.value}],
                                            opacity: slides[index].subtitle.alpha.value,
                                        }
                                    })
                                ]}
                            >{slides[index].subtitle.text}</Reanimated.Text>
                        </View>
                    )
                })}
                <View style={[
                    styles.components,
                ]}>
                    <Reanimated.View style={[
                        styles.selected,
                        selectedAnimation,
                    ]}/>
                    {ovals.map((_, index) => {
                        return (
                            <Reanimated.View
                                key={`oval_${index}`} 
                                style={[
                                    styles.oval,
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
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgb(0, 0, 0)'
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        opacity: 0.5
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
        textAlign: 'center',
        color: colors.whiteOpacity100
    },
    subtitle: {
        flex: 0,
        height: 56,
        textAlign: 'center',
        color: colors.whiteOpacity60
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
        marginHorizontal: 4,
        backgroundColor: colors.whiteOpacity60
    },
    selected: {
        position: 'absolute',
        left: 0,
        width: 24,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4,
        backgroundColor: colors.whiteOpacity100
    }
});

export default Slides;