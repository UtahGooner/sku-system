/**
 * Created by steve on 3/21/2017.
 */

import React from 'react';
import ColorsFilter from "./ColorsFilter";
import ColorsList from "./ColorsList";
import ColorEditor from "./ColorEditor";

const ColorsTab: React.FC = () => {

    return (
        <div className="container">
            <div className="row g-3">
                <div className="col-4">
                    <ColorsFilter/>
                    <ColorsList/>
                </div>
                <div className="col-4">
                    <ColorEditor />
                </div>
                <div className="col-4">
                    (reserved space for where-used list)
                </div>
            </div>
        </div>
    )
}
export default ColorsTab
