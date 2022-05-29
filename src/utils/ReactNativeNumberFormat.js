import React from 'react';
import NumberFormat from 'react-number-format';
import {Text} from 'react-native'

export function ReactNativeNumberFormat(props) {
    return (
        <NumberFormat
            value={props.value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={''}
            renderText={formattedValue => <Text style={props.textStyle}>{formattedValue}</Text>} // <--- Don't forget this!
        />
    );
}
