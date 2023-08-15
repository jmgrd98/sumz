import {logo} from "../assets";


export default function Hero() {

    return (
        <header className={'w-full flex justify-center items-center flex-col'}>
            <nav className={'flex justify-between items-center w-full mb-10 pt-3'}>
                <img src={logo} alt={'Sumz Logo'} className={'w-28 object-contain'}/>

                <button type={'button'} onClick={() => window.open('https://github.com/jmgrd98')} className={'black_btn'}>
                    Github
                </button>
            </nav>

            <h1 className={'head_text'}>Summarize Articles with <br className={'max-md:hidden'}/>
                <span className={'orange_gradient'}>OpenAI GPT-4</span>
            </h1>
            <h2 className={'desc'}>
                Simplify your reading with Sumz, a free tool that summarizes articles using the latest AI technology.
            </h2>
        </header>
    );
}