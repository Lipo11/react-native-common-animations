'use strict';

import React from 'react';
import { Animated, Easing } from 'react-native';

const easing = Easing.bezier( .25, .1, .25, 1 );

export default class FadeOut extends React.PureComponent
{
    constructor( props )
    {
        super( props );

        this.animated = ( this.props.hasOwnProperty('animate') ? this.props.animate : true );

        this.duration = this.props.duration || 1250;
        this.delay = this.props.delay || 0;

        this.offsetX = new Animated.Value( 0 );
        this.offsetY = new Animated.Value( 0 );
		this.opacity = new Animated.Value( ( this.animated ? 1 : this.props.opacity || 0 ) );
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
        Animated.parallel(
        [
            Animated.timing( this.offsetX, { toValue: this.props.offsetX || 0, duration: this.duration, delay: this.delay, easing, useNativeDriver: true }),
            Animated.timing( this.offsetY, { toValue: this.props.offsetY || 0, duration: this.duration, delay: this.delay, easing, useNativeDriver: true }),
            Animated.timing( this.opacity, { toValue: this.props.opacity || 0, duration: this.duration , delay: this.delay, easing, useNativeDriver: true })
        ])
        .start();
	}

    render()
    {
        return (
            <Animated.View style={{ opacity: this.opacity, transform: [{ translateX: this.offsetX }, { translateY: this.offsetY }]}}>
                {this.props.children}
            </Animated.View>
        )
    }
}
