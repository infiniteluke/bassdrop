<h1 align="center">
<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->
    </br>
    <img src="https://user-images.githubusercontent.com/1127238/38772424-0d4ac7ee-3feb-11e8-90aa-68252a518286.png" alt="bassdrop logo" title="bassdrop logo" width="100">
</h1>
<p align="center">
<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: description
-->
</p>
<hr />

<!--emdaer-p
  - '@emdaer/plugin-shields'
  - shields:
      - alt: 'Travis'
        image: 'travis/infiniteluke/bassdrop.svg'
        link: 'https://travis-ci.org/infiniteluke/bassdrop/'
        style: 'flat-square'
      - alt: 'npm'
        image: 'npm/v/bassdrop.svg'
        link: 'https://www.npmjs.com/package/bassdrop'
        style: 'flat-square'
      - alt: 'GitHub Issues'
        image: 'github/issues/infiniteluke/bassdrop.svg'
        link: 'https://github.com/infiniteluke/bassdrop/issues'
        style: 'flat-square'
      - alt: 'Coverage'
        image: 'coveralls/infiniteluke/bassdrop.svg'
        link: ''
        style: 'flat-square'
      - alt: 'Styled with Prettier'
        image: 'badge/styled_with-prettier-ff69b4.svg'
        link: 'https://github.com/prettier/prettier'
        style: 'flat-square'
      - alt: 'README generated by emdaer'
        image: 'badge/📓-documented%20with%20emdaer-F06632.svg'
        link: 'https://github.com/emdaer/emdaer'
        style: 'flat-square'
-->
</br>
<!--emdaer-p
  - '@emdaer/plugin-shields'
  - shields:
      - alt: 'Twitter'
        image: 'twitter/url/https/github.com/infiniteluke/bassdrop.svg'
        link: 'https://twitter.com/intent/tweet?text=Check%20out%20this%20downshift🏎️%20powered%20dropdown%20libray%20for%20react%20vr!%20bassdrop🔊%20https://github.com/infiniteluke/bassdrop'
        style: 'social'
      - alt: 'GitHub stars'
        image: 'github/stars/infiniteluke/bassdrop.svg'
        link: 'https://github.com/infiniteluke/bassdrop/stargazers'
        style: 'social'
-->

bassdrop is a [downshift🏎️](https://github.com/paypal/downshift) powered dropdown library for building drop downs and select lists in react vr. It uses the [function as child](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9) and "prop getter" patterns, which gives you maximum flexibility with a minimal API.

## Table of Contents
<!--emdaer-t
  - '@emdaer/transform-table-of-contents'
-->

## Installation

This module is distributed via [npm](https://www.npmjs.com/package/bassdrop) which is bundled with [node](https://nodejs.org) and
should be installed as one of your project's `dependencies`:

```
npm install --save bassdrop
```

> This package also depends on `react-vr`, `prop-types` and `react`. Please make sure you have those installed as well.

## Usage
```jsx
import BassDrop from 'bassdrop';
import { Text, View, VrButton, Animated } from 'react-vr';

// Small helper function to choose item bg color.
function getDropdownItemBgColor(selectedItem, item, highlightedIndex, index) {
  if (selectedItem === item) {
    return 'gray';
  }
  if (highlightedIndex === index) {
    return 'lightgray';
  }
  return 'white';
}

function VrDropdown({ items, placeholder }) {
  return (
    <BassDrop
      // The string to show when no item is selected/highlighted. Defaults to ''.
      placeholder={placeholder}
      // The render prop is called on each render providing prop getters and state to be used in your UI.
      // This function can alternatively be called as a child prop <BassDrop>{(stateAndHelpers) => {...}}</BassDrop>
      render={({
        // Prop getters
        getItemProps,
        getToggleButtonProps,
        getRootProps,
        // State
        isOpen,
        selectedItemIsHighlighted,
        itemDisplay,
        highlightedIndex,
        selectedItem,
      }) => (
        <View
          // This is the main wrapper View for the dropdown
          style={{
            position: 'absolute',
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }],
          }}
          billboarding={'on'}
          {...getRootProps()}
        >
          <VrButton
            // This button will control toggling the dropdown open/closed
            {...getToggleButtonProps()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              height: 0.7,
              width: 3,
              paddingLeft: 0.2,
            }}
          >
            <Text
              // This text represents the value or the highlighted value for the dropdown
              style={{
                backgroundColor: 'white',
                color: selectedItemIsHighlighted ? 'black' : 'grey',
                fontSize: 0.3,
                fontWeight: '400',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            >
              {itemDisplay}
            </Text>

            <View
              // This is purely presentational -- why render props rock!
              style={{
                paddingRight: 0.2,
                paddingLeft: 0.2,
                backgroundColor: 'gray',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Image
                source={asset('arrow.png')}
                style={{
                  justifyContent: 'center',
                  width: 0.5,
                  height: 0.5,
                }}
              />
            </View>
          </VrButton>
          {isOpen ? (
            <View
              // The list of items to be shown when the dropdown is open
              style={{
                width: 3,
                backgroundColor: 'white',
                transform: [
                  {
                    translate: [0, -1.3, -0.3],
                  },
                ],
              }}
            >
              {items.map((item, index) => (
                <VrButton
                  // Each item should be a VrButton
                  {...getItemProps({
                    item,
                    index,
                  })}
                  key={item}
                >
                  <Text
                    // This is the text for the item
                    style={{
                      fontSize: 0.3,
                      padding: 0.1,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: 'black',
                      backgroundColor: getDropdownItemBgColor(
                        selectedItem,
                        item,
                        highlightedIndex,
                        index
                      ),
                    }}
                  >
                    {item}
                  </Text>
                </VrButton>
              ))}
            </View>
          ) : null}
        </View>
      )}
    />
  );
}
```

...creates something like this:</br></br>
![bassdrop dropdown example](https://user-images.githubusercontent.com/1127238/38750478-e5034f04-3f09-11e8-842f-4b59bea6ad21.gif)

## Props
See the [API Docs](https://infiniteluke.github.io/bassdrop) for information on the props exposed by this package. The usage example above is not an exhaustive list.

## How To Render
bassdrop 🔊 uses the child callback render function pattern. This is where you render whatever you want to based on the state of bassdrop which is passed to the callback as parameters. The function is passed as the child prop of the `BassDrop` component:
```jsx
<BassDrop>
  {({/* parameters here */}) => (/* your render code here*/)}
</BassDrop>
```
or can be called from the render prop
```jsx
<BassDrop
  render= {({/* parameters here */}) => (/* your render code here*/)}
/>
```

The paramters of this function can be split into two categories: State and Prop Getters.

See the [API Docs](https://infiniteluke.github.io/bassdrop/#stateandhelpers) for a list of these properties.

## Examples
Check out the [demo site](https://infiniteluke.github.io/bassdrop-example/) to see how bassdrop 🔊 works in VR. See the [demo repo](https://github.com/infiniteluke/bassdrop-example) for the code behind the demo site.

## Contributing

If you'd like to make bassdrop 🔊 better, please read our [guide to contributing](./CONTRIBUTING.md).

These wonderful people have contributed to bassdrop 🔊 in one way or another:
<!--emdaer-p
  - '@emdaer/plugin-contributors-details-github'
-->

## License
<!--emdaer-p
  - '@emdaer/plugin-license-reference'
-->

<!--emdaer-t
  - '@emdaer/transform-prettier'
  - options:
      config: ./prettier.config.js
-->