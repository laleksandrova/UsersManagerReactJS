import React from 'react';
import { Main } from '../main/main';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

class Layout extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };

    }

    render() {
        return (
            <div className="Layout">
                <Header></Header>
                <Main count={this.state.count}></Main>
                <Footer></Footer>
            </div>
        );  
    }
}

export default Layout;