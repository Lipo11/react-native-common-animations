'use strict';

import React from 'react';
import { Animated, Easing } from 'react-native';

const easingElastic = Easing.elastic( 2 );
const easing = Easing.bezier( .215, .61, .355, 1 );

/*from,
 60%,
 75%,
 90%,
 to {
   -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
   animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
 }

 0% {
   opacity: 0;
   -webkit-transform: translate3d(0, -3000px, 0);
   transform: translate3d(0, -3000px, 0);
 }

 60% {
   opacity: 1;
   -webkit-transform: translate3d(0, 25px, 0);
   transform: translate3d(0, 25px, 0);
 }

 75% {
   -webkit-transform: translate3d(0, -10px, 0);
   transform: translate3d(0, -10px, 0);
 }

 90% {
   -webkit-transform: translate3d(0, 5px, 0);
   transform: translate3d(0, 5px, 0);
 }

 to {
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}*/

export default class PopIn extends React.Component
{
    constructor( props )
    {
        super( props );

        this.animated = ( this.props.hasOwnProperty('animate') ? this.props.animate : true );

        this.duration = this.props.duration || 1250;
        this.delay = this.props.delay || 0;
        this.maxScale = this.props.scale || 1.15;

        this.scale = this.animated ? new Animated.Value( 0.01 ) : new Animated.Value( 1 );
    }

	componentDidMount()
	{
        if( this.animated )
		{
        	this.animate();
        }
    }

    shouldComponentUpdate( nextProps, nextState )
    {
        if( this.animated && nextProps.animationID !== this.props.animationID || !this.props.animationID )
        {
            this.scale = this.animated ? new Animated.Value( 0.01 ) : new Animated.Value( 1 );
            this.animate();
        }

        return true;
    }

    animate()
    {
        Animated.timing( this.scale, { toValue: 1, duration: this.duration, delay: this.delay, easing: easingElastic, useNativeDriver: true }).start();
        /*Animated.sequence(
        [
            Animated.timing( this.scale, { toValue: 1 + ( this.maxScale - 1 ), duration: this.duration * 0.6, delay: this.delay, easing, useNativeDriver: true }),
            Animated.timing( this.scale, { toValue: 1 - ( this.maxScale - 1 ) / 3, duration: this.duration * 0.15, easing, useNativeDriver: true }),
            Animated.timing( this.scale, { toValue: 1 + ( this.maxScale - 1 ) / 5, duration: this.duration * 0.15, easing, useNativeDriver: true }),
            //Animated.timing( this.scale, { toValue: 1 - ( this.maxScale - 1 ) / 7, duration: this.duration * 0.15, easing, useNativeDriver: true }),
            Animated.timing( this.scale, { toValue: 1, duration: this.duration * 0.15, easing, useNativeDriver: true })
        ])
        .start();*/
	}

    render()
    {
        return (
            <Animated.View style={{ transform: [{ scaleX: this.scale }, { scaleY: this.scale }]}}>
                {this.props.children}
            </Animated.View>
        )
    }
}
