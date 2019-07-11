'use strict';

import React from 'react';
import { Animated, Easing } from 'react-native';

const easing = Easing.bezier( .42, 0, .58, 1 );

export default class Tada extends React.PureComponent
{
    constructor( props )
    {
        super( props );

        this.animated = ( this.props.hasOwnProperty('animate') ? this.props.animate : true );

        this.duration = this.props.duration || 1250;
        this.delay = this.props.delay || 0;

        this.scale = new Animated.Value( 1 );
        this.rotate = new Animated.Value( 0.5 );
        this.rotation = this.rotate.interpolate(
        {
            inputRange: [0, 1],
            outputRange: ['-3deg', '3deg']
        })
    }

	componentDidMount()
	{
        if( this.animated )
		{
            this.animate();
        }
    }

    animate()
    {
        Animated.sequence(
        [
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 0.9, duration: this.duration * 0.1, delay: this.delay, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 1, duration: this.duration * 0.1, delay: this.delay, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 0.9, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 0, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1.1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 1, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1.1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 0, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1.1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 1, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1.1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 0, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1.1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 1, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1.1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 0, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1.1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 1, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ]),
            Animated.parallel(
            [
                Animated.timing( this.scale, { toValue: 1, duration: this.duration * 0.1, easing, useNativeDriver: true }),
                Animated.timing( this.rotate, { toValue: 0.5, duration: this.duration * 0.1, easing, useNativeDriver: true })
            ])
        ])
        .start();
	}

    render()
    {
        return (
            <Animated.View style={{ transform: [{ scaleX: this.scale }, { scaleY: this.scale }, { rotate: this.rotation }]}}>
                {this.props.children}
            </Animated.View>
        )
    }
}
