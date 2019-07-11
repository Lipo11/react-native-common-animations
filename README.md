# React native common animations
Most usage and most useful animations for your react native app

### Installing
```
npm install react-native-common-animations --save
- or -
yarn add react-native-common-animations
```

### Usage
```
import React from 'react';
import { Countdown, FadeIn, FadeOut, PopIn, Tada } from 'react-native-common-animations';

export default class Example extends React.Component
{
    render() {
        return (
            <View>
				<Countdown go={true} text={ {show : true , style : { color: 'rgba(0,0,0,0.3)' } } } colors={{ stroke: ['#ff0844', '#ffb199'], outline: '#f7f7f7'}} start={Date.now()} end={Date.now()+5000} borderWidth={4} radius={50} />
				<FadeIn offsetY={30} duration={500}>
					<View>
						<Text>{'FadeIn'}</Text>
					</View>
				</FadeIn>
				<FadeOut offsetY={-15} opacity={1} delay={2} duration={5}>
					<View>
						<Text>{'FadeOut'}</Text>
					</View>
				</FadeOut>
				<PopIn duration={500} animate={true}>
					<View>
						<Text>{'PopIn'}</Text>
					</View>
				</PopIn>
				<Tada delay={1000} duration={500}>
					<View>
						<Text>{'Tada'}</Text>
					</View>
				</Tada>
			</View>
        );
    }
}
```
### Overall API

#### duration int
Duration of animation

#### delay int
Delay before start animation.

#### offsetY
Offset for animation.

#### opacity
Opacity of elements.

#### animate [true|false]
Do you wanna animate?

### API for Countdown

#### go [true|false]
Showing text go after time ended.

#### text [{show:[true|false],style:[{}]}]
Showing text over the circle.

#### colors [{stroke:[],outline:''}]
Colors of countdown.

#### start|end timestamp
Time from to.

#### borderWidth int
Your border width for countdown.

#### radius int
Your radius size for countdown.

#### from|to int
If you don't want to use circle you can use from to params. For this param you should use type text.

#### type [text|int]
Type of count down.