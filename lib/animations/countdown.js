'use strict';

import React from 'react';
import { Animated, Easing, Text } from 'react-native';

const easing = Easing.bezier( .25, .1, .25, 1 );

function getFormattedTime( ms, short = true, detailed = false )
{
	const D = 24*60*60*1000, H = 60*60*1000, M = 60*1000, S = 1000;

	if( ms <= 0 ){ return '0s'; }

	let days = Math.floor(ms / D);
	let daysms = ms % D;
	let hours = Math.floor((daysms)/H);
	let hoursms= ms % H;
	let minutes = Math.floor((hoursms)/M);
	let minutesms= ms % M;
	let sec = Math.floor((minutesms)/S);

	if( !detailed )
	{
		if( ms > D )
		{
			const days = Math.floor(ms / D), hours = Math.ceil((ms - days * D) / H);

			return days+'d ' + hours+'h';
		}
		else if( ms > H )
		{
			const hours = Math.floor(ms / H), mins = Math.ceil((ms - hours * H) / M);

			return ( mins >= 60 ) ? ((hours + 1)+'h' ) : ( hours+'h ' + mins+'m' );
		}
		else if( ms > M )
		{
			const mins = Math.floor(ms / M), secs = Math.ceil((ms - mins * M) / S);

			return ( secs >= 60 ) ? ((mins + 1)+'m 00s' ) : ( mins+'m ' + ('0'+secs).substr(-2)+'s' );
		}
		else
		{
			const secs = Math.ceil(ms / S);

			return secs+'s';
		}
	}

	let deadline = [];
	if( days > 0 ){ deadline.push(days + 'd'); }
	if( hours > 0 ){ deadline.push(hours + 'h'); }
	if( minutes > 0 ){ deadline.push(minutes + 'm'); }
	if( sec > 0 ){ deadline.push(sec + 's'); }

	if( detailed )
	{
		let secms = ms % 1000;
		deadline.push(secms + 'ms');
	}

	let deadlineTxt = '';
	for( let i = 0; i < deadline.length; ++i )
	{
		deadlineTxt += ( i != 0 ? ' ' : '' ) + deadline[i];
		if( short && i === ( detailed ? 2 : 1 ) ){ break; }
	}

	return deadlineTxt;
}

export default class Countdown extends React.PureComponent
{
    constructor( props )
    {
        super( props );

		this.animated = ( this.props.hasOwnProperty('animate') ? this.props.animate : true );
		this.started = 0;
        this.duration = parseInt( ( this.props.duration || 750 ) / 17 );
        this.delay = this.props.delay || 0;

		this.type = this.props.type;

		this.state = { value: this.props.to };
    }

	componentDidMount()
    {
		if( this.animated )
		{
			this.started = Date.now() + this.delay;
			this.setState({ value : this.props.from });

			//this.animate();
			setTimeout(this.animate.bind(this), this.delay);
		}
    }

    animate()
    {
		let newValue = this.state.value;

		const now = Date.now(), from = parseFloat( this.props.from ), to =  parseFloat( this.props.to );

		let value = from + ( to - from ) * Math.min( 1, ( now - this.started ) / this.props.duration );
		this.setState({ value });

		if( ( now - this.started ) < this.props.duration )
		{
			setTimeout(this.animate.bind(this), 17);
		}
	}

    render()
    {
		if( this.type === 'time' )
		{
			return (<Text>{getFormattedTime( Math.ceil(this.state.value), true, true )}</Text>);
		}
		else
		{
			return (<Text>{Math.ceil(this.state.value)}</Text>);
		}

    }
}
