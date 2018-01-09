import React, { Component } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

@observer
class NavigationItem extends Component {
  handleClick = (event) => {
    const { chapter } = this.props;

    if (chapter.active && chapter.story.progress > 0) {
      event.preventDefault();
      chapter.reset();
    }
  }

  render() {
    const { chapter, className } = this.props;
    const { index, done, active, title } = chapter;

    return (
      <Link
        to={`/chapter/${index}`}
        className={cx(className, { done, active })}
        onClick={this.handleClick}
      >
        <NavigationLabel>{title}</NavigationLabel>
      </Link>
    );
  }
}

const NavigationLabel = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  white-space: nowrap;
`;

export default styled(NavigationItem)`
  transition: 200ms color;
  will-change: color;
  position: relative;
  margin-right: -1px; // Prevent strange artefacts.
  color: ${props => props.theme.color.grey};

  &.active {
    color: ${props => props.theme.color.highlight};
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
  }

  &:after {
    transition: 200ms clip-path;
    will-change: clip-path;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: white;
    clip-path: polygon(0% 0%, calc(50% - ${props => props.theme.spacing(0.75)}) 0%, 50% 0%, calc(50% + ${props => props.theme.spacing(0.75)}) 0%, 100% 0%, 100% 100%, 0% 100%);
    z-index: 0;
  }

  &.active:after,
  &:hover:after {
    clip-path: polygon(0% 0%, calc(50% - ${props => props.theme.spacing(0.75)}) 0%, 50% ${props => props.theme.spacing(0.75)}, calc(50% + ${props => props.theme.spacing(0.75)}) 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  &:before {
    transition: 200ms border-radius, 200ms transform, 200ms background-color;
    will-change: border-radius, transform, background-color;
    width: ${props => props.theme.spacing(0.25)};
    height: ${props => props.theme.spacing(0.25)};
    background-color: ${props => props.theme.color.grey};
    left: 50%;
    top: 50%;
    transform: translate(${props => props.theme.spacing(-0.1)}, ${props => props.theme.spacing(-0.1)}) scale(1);
    z-index: 2;
    border-radius: ${props => props.theme.spacing(0.125)};
    outline: ${props => props.theme.spacing(0.2)} solid white;
  }

  &.done:before,
  &.active:before {
    background-color: ${props => props.theme.color.highlight};
  }

  &.active:before,
  &:hover:before {
    border-radius: 0;
    transform: translate(-50%, -50%) rotate(-45deg) scale(1.2);
  }

  ${NavigationLabel} {
    transition: 200ms transform, 200ms opacity;
    will-change: transform, opacity;
    transform-origin: 0 100%;
    padding-left: 8px;
    padding-bottom: 1px;
    transform: translateY(-20px) rotate(-45deg);
    opacity: 0;
    pointer-events: none;
    z-index: 2;
  }

  &:hover ${NavigationLabel} {
    transform: translateY(0) rotate(-45deg);
    opacity: 1;
  }
`;