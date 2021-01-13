import React from "react";
import AmplifyClient from "../amplifyClient/client";

export default ({ element }) =>
    <AmplifyClient>
        {element}
    </AmplifyClient>