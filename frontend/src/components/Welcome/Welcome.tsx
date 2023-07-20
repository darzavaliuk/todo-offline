import {Link} from "react-router-dom";
import './style.css';

function Welcome() {
    return (
        <div>
            <div className="responsive-container-block big-container">
                <div className="responsive-container-block container">
                    <div className="responsive-container-block">
                        <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-12 img-one">
                            <img alt="golden-lines.png" className="image-block bg-image"
                                 src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/golden%20lines.png"/>
                        </div>
                        <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-12 content-one">
                            <p className="text-blk section-head">
                                Lorem ipsum dolor
                            </p>
                            <p className="text-blk section-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </p>
                            <p className="text-blk section-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in volupta
                            </p>
                            <Link to="/">
                                <button>Go to ToDo</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
);
}

export default Welcome;