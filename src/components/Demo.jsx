import {useState, useEffect} from "react";
import {copy, linkIcon, loader, tick} from '../assets';
import {useLazyGetSummaryQuery, useGetTranslationMutation} from "../services/article.js";
import Dropdown from './Dropdown.jsx'

export default function Demo() {

    const [article, setArticle] = useState({
        url: '',
        summary: '',
    })

    const [allArticles, setAllArticles] = useState([]);

    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    const getTranslation = useGetTranslationMutation();


    const [copied, setCopied] = useState('');

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const {data} = await getSummary({articleUrl: article.url});

        if (data?.summary) {
            const newArticle = {...article, summary: data.summary};
            setArticle(newArticle);
            setAllArticles([...allArticles, newArticle]);

            localStorage.setItem('articles', JSON.stringify([...allArticles, newArticle]));
        }
    }

    function handleCopy(copyUrl) {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <section className={'mt-16 w-full max-w-xl'}>
            <div className={'flex flex-col w-full gap-2'}>
                <form className={'relative flex justify-center items-center'} onSubmit={handleSubmit}>
                    <img src={linkIcon} alt={'Link icon'} className={'absolute left-0 my-2 ml-3 w-5'}/>

                    <input
                        type={'url'}
                        placeholder={'Enter a URL'}
                        value={article.url}
                        onChange={(e) => {
                            setArticle({...article, url: e.target.value})
                        }}
                        className={'url_input peer'}
                        required
                    />

                    <button
                        type={'submit'}
                        className={'submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'}
                    >
                        Go
                    </button>
                </form>

                <div className={'flex flex-col gap-1 max-h-60 overflow-y-auto'}>
                    {allArticles.map((article, index) => (
                        <div
                            key={`link-${index}`}
                            className={'link_card'}
                            onClick={() => setArticle(article)}
                        >
                            <div className={'copy_btn'} onClick={() => handleCopy(article.url)}>
                                <img src={copied === article.url ? tick : copy} alt={'Copy icon'} className={'w-[40%] h-[40%] object-contain'}/>
                            </div>
                            <p className={'text-blue-700 font-medium text-sm truncate'}>{article.url}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={'my-10 max-w-full flex justify-center items-center'}>

                {isFetching ?
                    <img src={loader} alt={'Loader'} className={'w-20 h-20 object-contain mx-auto'}/>
                : error ? (<p className={'font-inter font-bold text-black text-center'}>
                    Well, that wasn't supposed to happen...
                    <br/>
                    <span className={'font-satoshi font-normal text-gray-700'}>
                        {error?.data?.error}
                    </span>
                </p>) : (
                    article.summary && (
                        <div className={'flex flex-col gap-3'}>
                            <h2 className={'font-satoshi font-bold text-gray-600 text-xl'}>Article <span className={'blue_gradient'}>Summary</span></h2>
                            <div className={'summary_box'}>
                                <p className={'font-inter font-medium text-sm text-gray-700'}>
                                    {article.summary}
                                </p>
                            </div>
                            <p className={'font-satoshi font-bold text-gray-600'}>Do you wish to translate this text?</p>

                        </div>
                    )
                        )}

            </div>

        </section>
    );
}