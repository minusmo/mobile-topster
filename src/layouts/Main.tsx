import React from "react";

type PMain = {
    children: JSX.Element[] | JSX.Element;
}

const Main = ({
    children
}: PMain): JSX.Element => {
    return (
        <main id={"main"}>
            {children}    
        </main>
    );
}

export default Main;