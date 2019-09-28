import React from 'react';
import PropTypes from 'prop-types';

const InformationIcon = (props) => {
    return (
        <svg
            className={'colorInformationsvg'}
            width="18px"
            height="18px"
            viewBox="0 0 18 18"
            version="1.1"
            onClick={props.onClick}
        >
            <g
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                transform="translate(-1047.000000, -192.000000)"
            >
                <g transform="translate(0.000000, 152.000000)">
                    <g id="label" transform="translate(879.000000, 39.000000)">
                        <g transform="translate(168.000000, 1.000000)">
                            <g id="information-icon-copy">
                                <circle id="Oval" cx="9" cy="9" r="9" />
                                <text
                                    id="label-copy"
                                    style={{ fontSize: '14px', fontWeight: '500', fontStyle: 'normal' }}
                                >
                                    <tspan x="7" y="14">
										i
                                    </tspan>
                                </text>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

InformationIcon.propTypes = {
    onClick: PropTypes.func
};

export default InformationIcon;
