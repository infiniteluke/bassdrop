import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import { callAll } from './utils';

/**
 * # bassdrop
 * <h1 align="center">
 *   🔊 bassdrop
 *   </br>
 *   <img src="https://user-images.githubusercontent.com/1127238/38772424-0d4ac7ee-3feb-11e8-90aa-68252a518286.png" alt="bassdrop logo" title="bassdrop logo" width="100">
 * </h1>
 * <p align="center">a downshift powered dropdown library for react vr</p>
 * <hr />
 * </br>
 */
class BassDrop extends Component {
  /**
   * @type {object}
   *
   * @typedef {object} Props
   *
   * @property {string} [placeholder] - The string to show when no item is selected/highlighted
   * @property {function} [children] - Is called with the StateAndHelpers of bassdrop.
   * @property {function} [render] - Is called with the StateAndHelpers of bassdrop.
   */
  static propTypes = {
    placeholder: PropTypes.string,
    children: PropTypes.func,
    render: PropTypes.func,
  };

  static defaultProps = {
    placeholder: '',
  };

  /**
   * Stores items that have getItemProps spread into them
   * @private
   */
  items = [];

  /**
   * bassdrop's prop getters are exposed as a parameter to the render prop.
   * For further documentation on downshift, see https://github.com/paypal/downshift.
   *
   * @typedef {object} StateAndHelpers
   *
   * @property {function} getRootProps - prop getter - Sets the root props for the root container and sets suppressRefError=true.
   * @property {function} getToggleButtonProps - prop getter - returns the props to be applied to the VrButton that toggles bassdrop open.
   * @property {boolean} selectedItemIsHighlighted - state - whether or not the selected item is highlighted.
   * @property {string} itemDisplay - state - either the selected value, the highlighted value, or the placeholder prop value.
   */

  /**
   * Returns state and helpers for render callback.
   * @private
   *
   * @return {StateAndHelpers}
   *  The state and helper functions exposed as a parameter to the render callback
   */
  getStateAndHelpers = downshift => ({
    ...downshift,
    // Prop Getters
    getRootProps: () =>
      downshift.getRootProps(
        {},
        {
          suppressRefError: true,
        }
      ),
    getToggleButtonProps: (props = { onClick: () => {} }) => ({
      onClick: callAll(props.onClick, downshift.toggleMenu),
    }),
    getItemProps: (props = { onClick: () => {}, onEnter: () => {} }) => {
      let itemIndex = props.index;
      if (props.index === undefined) {
        this.items.push(props.item);
        itemIndex = this.items.indexOf(props.item);
      } else {
        this.items[props.index] = props.item;
      }
      return {
        ...downshift.getItemProps({
          item: props.item,
          index: props.index,
        }),
        onEnter: callAll(props.onEnter, () =>
          downshift.setHighlightedIndex(props.index)
        ),
        onClick: callAll(props.onClick, () => downshift.selectItem(props.item)),
      };
    },
    // State
    selectedItemIsHighlighted:
      downshift.selectedItem &&
      (downshift.highlightedIndex === null ||
        downshift.selectedItem === this.items[downshift.highlightedIndex]),
    itemDisplay:
      this.items[downshift.highlightedIndex] ||
      downshift.selectedItem ||
      this.props.placeholder,
  });

  render() {
    const { render, children = render, ...props } = this.props;
    return (
      <Downshift {...props}>
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    );
  }
}

export default BassDrop;
