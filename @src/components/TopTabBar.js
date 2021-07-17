import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
export default function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}>
            <View
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <Text
                style={{
                  fontWeight: isFocused ? 'bold' : 'normal',
                  color: isFocused ? 'black' : 'gray',
                  marginBottom: 20,
                }}>
                {label}
              </Text>
              {isFocused ? (
                <View
                  style={{
                    height: 3,
                    width: '25%',
                    backgroundColor: 'black',
                    borderRadius: 5,
                  }}
                />
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}
