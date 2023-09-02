import {useState, useEffect} from "react";
import {copy, linkIcon, loader, tick} from '../assets';
import {useLazyGetSummaryQuery} from "../services/article.js";

export default function Demo() {

    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });

    const [allArticles, setAllArticles] = useState([]);

    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    async function handleSubmit(e) {
        e.preventDefault();

        const {data} = await getSummary({articleUrl: article.url});

        if(data?.summary) {
            const newArticle = {...article, summary: data.summary};
            setArticle(newArticle);
            setAllArticles([...allArticles, newArticle]);
            console.log(newArticle);
        }
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


            </div>
        </section>
    );
}