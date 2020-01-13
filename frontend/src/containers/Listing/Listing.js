import React, {useEffect, useState} from 'react';
import Axios from '../../axios-config';
import { Link } from 'react-router-dom';
import './Listing.scss';
import WhiteWrapper from '../../components/whiteWrapper/whiteWrapper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Spinner from '../../components/Spinner/Spinner';

const Listing = props => {

    const [products, setProducts] = useState(null)
    const [category, setCategories] = useState(null)
    const [error, setError] = useState(null)
    const [textError, setTextError] = useState(null)

    const getQueryParameters = str => {
        return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    }

    useEffect(() => {
        let query = getQueryParameters(props.location.search).search;
        Axios.get(`/items?q=${query}`)
            .then(rsp => {
                if(rsp.status === 200 && Array.isArray(rsp.data.items) && (rsp.data.items).length){
                    setProducts(rsp.data.items);
                    setCategories(rsp.data.categories);
                    console.log(rsp.data)
                } else {
                    setError(true);
                    setTextError('No se encuentran resultados para tu búsqueda.');
                }
                
            }).catch(errors => {
                setError(true);
                setTextError('Hubo un error!');
            })
    }, [props.location.search])

    const ListProducts = () => {
        return products.map((item, index) => {
            return  <li key={index} className="prodsContent">
                        <div className="prodImage"><img src={item.picture} alt={item.title} /></div>
                        <div className="prodText">
                            <span className="price">$ {(item.price.amount).toString().slice(0, 3)} <span className="priceDecimal">{item.price.decimal}</span></span>
                            <Link to={`/items/${item.id}`}><span className="title">{item.title}</span></Link>
                        </div>
                    </li>
        })
    }

    if(error) {
        return <WhiteWrapper><h1 className="textError">{textError}</h1></WhiteWrapper>;
    }

    if(products){
        return (
            <div>
                <Breadcrumb data={category} />
                <WhiteWrapper>
                    <ul>
                        <ListProducts />
                    </ul>
                </WhiteWrapper>
            </div>
        )
    } else{
        return (
            <div>
                <WhiteWrapper>
                    <Spinner />
                </WhiteWrapper>
            </div>
        )
    }
}

export default Listing;