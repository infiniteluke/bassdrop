<!--
  This file was generated by emdaer

  Its template can be found at .emdaer/README.emdaer.md
-->

<p></p><h1 align="center">
bassdrop
    <br>
    <img src="https://user-images.githubusercontent.com/1127238/38772424-0d4ac7ee-3feb-11e8-90aa-68252a518286.png" alt="bassdrop logo" title="bassdrop logo" width="100">
</h1><p></p>
<p></p><p align="center">
🔊 a downshift powered dropdown library for react vr
</p><p></p>
<hr>

<p><a href="https://travis-ci.org/infiniteluke/bassdrop/"><img src="https://img.shields.io/travis/infiniteluke/bassdrop.svg?style=flat-square" alt="Travis"></a> <a href="https://www.npmjs.com/package/bassdrop"><img src="https://img.shields.io/npm/v/bassdrop.svg?style=flat-square" alt="npm"></a> <a href="https://github.com/infiniteluke/bassdrop/issues"><img src="https://img.shields.io/github/issues/infiniteluke/bassdrop.svg?style=flat-square" alt="GitHub Issues"></a> <a href=""><img src="https://img.shields.io/coveralls/infiniteluke/bassdrop.svg?style=flat-square" alt="Coverage"></a> <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="Styled with Prettier"></a> <a href="https://github.com/emdaer/emdaer"><img src="https://img.shields.io/badge/📓-documented%20with%20emdaer-F06632.svg?style=flat-square" alt="README generated by emdaer"></a>
<br>
<a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20downshift🏎️%20powered%20dropdown%20libray%20for%20react%20vr!%20bassdrop🔊%20https://github.com/infiniteluke/bassdrop"><img src="https://img.shields.io/twitter/url/https/github.com/infiniteluke/bassdrop.svg?style=social" alt="Twitter"></a> <a href="https://github.com/infiniteluke/bassdrop/stargazers"><img src="https://img.shields.io/github/stars/infiniteluke/bassdrop.svg?style=social" alt="GitHub stars"></a></p>
<p>bassdrop is a <a href="https://github.com/paypal/downshift">downshift🏎️</a> powered dropdown library for building drop downs and select lists in react vr. It uses the <a href="https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9">function as child</a> and “prop getter” patterns, which gives you maximum flexibility with a minimal API.</p>
<h2 id="table-of-contents">Table of Contents</h2>
<!-- toc -->
<ul>
<li><a href="#installation">Installation</a></li>
<li><a href="#usage">Usage</a></li>
<li><a href="#props">Props</a></li>
<li><a href="#how-to-render">How To Render</a></li>
<li><a href="#examples">Examples</a></li>
<li><a href="#contributing">Contributing</a></li>
<li><a href="#license">License</a></li>
</ul>
<!-- tocstop -->
<h2 id="installation">Installation</h2>
<p>This module is distributed via <a href="https://www.npmjs.com/package/bassdrop">npm</a> which is bundled with <a href="https://nodejs.org">node</a> and
should be installed as one of your project’s <code>dependencies</code>:</p>
<pre><code>
npm install --save bassdrop
</code></pre>
<blockquote>
<p>This package also depends on <code>react-vr</code>, <code>prop-types</code> and <code>react</code>. Please make sure you have those installed as well.</p>
</blockquote>
<h2 id="usage">Usage</h2>

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
<p>…creates something like this:<br><br>
<img src="https://user-images.githubusercontent.com/1127238/38750478-e5034f04-3f09-11e8-842f-4b59bea6ad21.gif" alt="bassdrop dropdown example"></p>
<h2 id="props">Props</h2>
<p>See the <a href="https://infiniteluke.github.io/bassdrop">API Docs</a> for information on the props exposed by this package. The usage example above is not an exhaustive list.</p>
<h2 id="how-to-render">How To Render</h2>
<p>bassdrop 🔊 uses the child callback render function pattern. This is where you render whatever you want to based on the state of bassdrop which is passed to the callback as parameters. The function is passed as the child prop of the <code>BassDrop</code> component:</p>

```jsx
<BassDrop>
  {({/* parameters here */}) => (/* your render code here*/)}
</BassDrop>
```
<p>or can be called from the render prop</p>

```jsx
<BassDrop
  render= {({/* parameters here */}) => (/* your render code here*/)}
/>
```
<p>The paramters of this function can be split into two categories: State and Prop Getters.</p>
<p>See the <a href="https://infiniteluke.github.io/bassdrop/#stateandhelpers">API Docs</a> for a list of these properties.</p>
<h2 id="examples">Examples</h2>
<p>Check out the <a href="https://infiniteluke.github.io/bassdrop-example/">demo site</a> to see how bassdrop 🔊 works in VR. See the <a href="https://github.com/infiniteluke/bassdrop-example">demo repo</a> for the code behind the demo site.</p>
<h2 id="contributing">Contributing</h2>
<p>If you’d like to make bassdrop 🔊 better, please read our <a href="./CONTRIBUTING.md">guide to contributing</a>.</p>
<p>These wonderful people have contributed to bassdrop 🔊 in one way or another:</p>
<details>
<summary><strong>Contributors</strong></summary><br>
<a title="I build multi-channel publishing systems and web applications at @fourkitchens." href="https://github.com/infiniteluke">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1127238?s=24">
</a>
<strong>Luke Herrington</strong>
<br><br>
</details>

<h2 id="license">License</h2>
<p>bassdrop is <a href="./LICENSE">MIT licensed</a>.</p>