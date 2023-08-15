import {Component} from "react";
import Demo from "./components/Demo";
import Hero from "./components/Hero";
import './App.css';

class App extends Component {
    render() {
        return (
            <main>
                <div className={'main'}>
                    <div className={'gradient'}/>

                    <div className={'app'}>
                        <Hero/>
                        <Demo/>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;