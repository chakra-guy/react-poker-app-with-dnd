/* eslint-disable */
import styled, { css } from 'styled-components';
import { getColourForSuit } from '../utils';

export const Main = styled.main`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;

	.row {
		text-align: center
	}
`;

export const Header = styled.header`
	max-width: 800px;
	padding: 20px 0;
	margin: 0 auto;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;

	img {
		margin-right: 20px;
	}
`;

export const CardContent = styled.div`
	width: 30px;
	height: 55px;
	line-height: 55px;
	border-radius: 3px;
	background: #fff;
	box-shadow: 0 0 0 2px #fff;
	position: relative;
	display: inline-block;
	text-align: center;
	margin: 0 10px 10px 0;
	font-weight: 700;
	vertical-align: top;

	border: 2px solid;
	border-color: ${props => getColourForSuit(props.suit)};
	color: ${props => getColourForSuit(props.suit)};

	&:after,
	&:before {
		content: "${props => props.suit}";
		position: absolute;
		font-size: 12px;
		line-height: 1.2;
		font-weight: 400;
	}

	&:after {
		top: 5px;
		right: 5px;
	}

	&:before {
		bottom: 5px;
		left: 5px;
	}

	${props => ((props.selected || props.isDragging)
		? css`
			background: ${getColourForSuit(props.suit)}
			box-shadow: 0 0 0 2px ${getColourForSuit(props.suit)};
			color: white;
			border-color: white;
		`
		: null)
	}

	${props => (props.disabled
		? css`
			opacity: .5;
			pointer-events: none;
		`
		: null)
	}
`;

export const CardContentClone = styled(CardContent)`
	opacity: .5;
	pointer-events: none;
  + div {
    display: none!important;
  }
`;

export const Footer = styled.footer`
	border-top: 1px solid #eee;
	margin-top: 20px;
	padding: 20px 0;
`;

export const Button = styled.button`
	background: transparent;
	border: 1px solid #eee;
	border-radius: 5px;
	color: #eee;
	padding: .5em;
	outline: none;

	& + & {
		margin-left: 20px;
	}

	&:disabled {
		opacity: .5;
		&:hover {
			background: transparent;
		}
	}

	&:hover {
		background: rgba(255, 255, 255, 0.12);
	}
`;

export const CardHolder = styled.div`
	display: grid;
	grid-template-columns: repeat(13, 0fr);
`;

export const PlayerHand = styled(CardHolder)`
	background: #888;
	padding: 15px 15px 5px;
	border-radius: 5px;
	min-height: 69px;
	position: relative;
	${ transition('background-color', 0.2, 'ease-out') }
	div { vertical-align: top; }

	${props => (props.isDraggingOver
		? css`
			background: #455cbd;
		`
		: null)
	}

	${props => (props.isDisabled
		? css`
			cursor: no-drop;
		`
		: null)
	}
`;

export const PlayerHeader = styled.p`
	display: flex;
`;

export const PlayerName = styled.input`
	flex: 1;
	background-color: transparent;
	color: #eee;
	border: none;
	font-size: 1em;
	padding: 0.3em;
	vertical-align: middle;
	margin-right: 20px;
	border-radius: 4px;
	outline: none;
	&:focus {
    background-color: #eee;
    color: #000;
	}
	${props => (props.disabled
		? null
		: css`
			background-color: #eee;
    	color: #000;
		`)
	}
`;

export const Placeholder = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
	pointer-events: none;
`;

export const WinnerTitle = styled.h1`
	span {
		display: block;
    font-size: 2em;
    margin-bottom: 0.1em;
	}
`;

function transition(property, delay, timing) {
  return `
		-webkit-transition: ${property} ${delay}s ${timing};
		-moz-transition: ${property} ${delay}s ${timing};
		-ms-transition: ${property} ${delay}s ${timing};
		-o-transition: ${property} ${delay}s ${timing};
		transition: ${property} ${delay}s ${timing};
  `;
}