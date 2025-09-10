import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import type BorderProps from '../../types/components/Border';
import './Border.css';

const Border = (props: PropsWithChildren<BorderProps>) => { 
    const {
        borderStyle = 'inset', 
        borderWidth='5px', 
        className,
        marginBottom='0px', 
        padding='10px', 
        children
    } = props;

    const compClassName = classNames('game-box', {
        [borderStyle]: borderStyle,
        [className!]: className,
    });

    const compStyle = {
        borderWidth,
        marginBottom,
        padding
    }
    return <div className={compClassName} style={compStyle}>{children}</div>
}

export default Border;