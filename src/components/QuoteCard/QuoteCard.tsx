import { TfiReload } from 'react-icons/tfi';
import { BsFillTrashFill } from 'react-icons/bs';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export default function QuoteCard() {
    const userId = "a";
    const favorite = false;

    return (
        <div className="quote-card">
            <h1>QuoteCard</h1>
            <div className="card-bar flex-align-center">
                <div className="card-bar-left">
                    <TfiReload className="icon reload" />
                </div>
                <h2>Category</h2>
                {userId && 
                    <div className="card-bar-right">
                        { favorite 
                            ? <MdFavorite className="icon favorite" /> 
                            : <MdFavoriteBorder className="icon unfavorite" /> 
                        }
                        
                        <BsFillTrashFill className="icon trash" />
                    </div>
                }
            </div>
            <div className='card-body'>
                <p>Quote</p>
                <p>Author</p>
            </div>
        </div>
    )
}