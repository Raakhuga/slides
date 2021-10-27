import React, { useRef } from 'react';
import fontStyles from '../styles/FontStyles';
import colorStyles from '../styles/ColorStyles';
import Reanimated, { withSpring, useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { Dimensions, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

const Slides = () => {
    const currentSlide = useRef(0);

    const slides = [
        {
            image: require('../assets/Welcome1.png'),
            alpha: useSharedValue(1),
            scale: useSharedValue(1),
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
            image: require('../assets/Welcome2.png'),
            alpha: useSharedValue(0),
            scale: useSharedValue(0.9),
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
            image: require('../assets/Welcome3.png'),
            alpha: useSharedValue(0),
            scale: useSharedValue(0.9),
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

    const changeImage = (old: number, act: number) => {
        slides[old].alpha.value = withTiming(0, {duration:400})
        slides[old].scale.value = withTiming(0.9, {duration:400})
        slides[act].alpha.value = withDelay(400, withTiming(1, {duration:400}))
        slides[act].scale.value = withDelay(400, withTiming(1, {duration:400}))
    }

    const moveSelected = (act: number) => {
        selectedPos.value = withSpring(act * 14, {
            damping: 13,
            mass: 1,
            stiffness: 100
        });
    }

    const nextPagination = (old: number, act: number) => {
        if (act > old) {
            ovals[act-1].pos.value = withSpring(ovals[act-1].orig - 32, {
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

    const nextText = (old: number, act: number) => {
        if (act > old) {

            slides[old].title.x.value = withTiming(-Dimensions.get('window').width, {
                easing: Easing.inOut(Easing.exp),
                duration: 400
            });
            slides[old].subtitle.x.value = withTiming(-Dimensions.get('window').width, {
                easing: Easing.inOut(Easing.exp),
                duration: 400
            });
            slides[old].title.alpha.value = withTiming(0, {duration: 300});
            slides[old].subtitle.alpha.value = withTiming(0, {duration: 300});
            
            slides[act].title.x.value = Dimensions.get('window').width;
            slides[act].subtitle.x.value = Dimensions.get('window').width;

            slides[act].title.x.value = withSpring(0, {
                damping: 13,
                mass: 1,
                stiffness: 100
            });
            slides[act].subtitle.x.value = withDelay(4, withSpring(0, {
                damping: 13,
                mass: 1,
                stiffness: 100
            }));
            slides[act].title.alpha.value = withTiming(1, {duration: 300})
            slides[act].subtitle.alpha.value = withDelay(4, withTiming(1, {duration: 300}))

        } else {

            slides[old].title.x.value = withTiming(Dimensions.get('window').width, {
                easing: Easing.inOut(Easing.exp),
                duration: 400
            });
            slides[old].subtitle.x.value = withTiming(Dimensions.get('window').width, {
                easing: Easing.inOut(Easing.exp),
                duration: 400
            });
            slides[old].title.alpha.value = withTiming(0, {duration: 300});
            slides[old].subtitle.alpha.value = withTiming(0, {duration: 300});

            slides[act].title.x.value = -Dimensions.get('window').width;
            slides[act].subtitle.x.value = -Dimensions.get('window').width;
            slides[act].title.x.value = withSpring(0, {
                damping: 13,
                mass: 1,
                stiffness: 100
            });
            slides[act].subtitle.x.value = withDelay(4,withSpring(0, {
                damping: 13,
                mass: 1,
                stiffness: 100
            }));
            slides[act].title.alpha.value = withTiming(1, {duration: 300})
            slides[act].subtitle.alpha.value = withDelay(4, withTiming(1, {duration: 300}))
        }
    }
    
    const nextSlide = () => {
        let old = currentSlide.current;
        currentSlide.current = currentSlide.current == slides.length-1 ? 0 : currentSlide.current+1;
        moveSelected(currentSlide.current);
        nextPagination(old, currentSlide.current);
        nextText(old, currentSlide.current);
        changeImage(old, currentSlide.current);
    }

    const click = () => {
        nextSlide();
    }
   
    return (
        <View style={{position:'absolute', width: '100%', height: '100%', backgroundColor: 'rgb(0, 0, 0)'}}>
            {slides.map((_, index) => {
                return (
                    <Reanimated.Image
                        key={`bg_${index}`}
                        style={[
                            styles.backgroundImage,
                            useAnimatedStyle(() => {
                                return {
                                    opacity: slides[index].alpha.value,
                                    transform: [{scale: slides[index].scale.value}]
                                }
                            })
                        ]}
                        source={slides[index].image}
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
                                colorStyles.whiteOpacity100,
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
                                colorStyles.whiteOpacity60,
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
                backgroundColor: 'red',
                zIndex: 10
            }} onPress={click}/>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
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