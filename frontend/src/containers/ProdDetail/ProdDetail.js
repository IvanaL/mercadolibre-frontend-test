import React, {useEffect, useState} from 'react';
import Axios from '../../axios-config';
import WhiteWrapper from '../../components/whiteWrapper/whiteWrapper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './ProdDetail.scss';

const ProdDetail = props => {
    const [productDescription, setProductDescription] = useState(null)
    const [error, setError] = useState(null)
    const [category, setCategories] = useState(null)

    useEffect(() => {
        Axios.get(`/items/${props.match.params.id}`)
        .then(rsp => {
            setProductDescription(rsp.data.item);
            setCategories(rsp.data.item.category);
        }).catch(errors => {
            setError(true)
        })
    }, [props.location.search])

    if(error) {
        return <WhiteWrapper><h1>Hubo un error!</h1></WhiteWrapper>;
    }
    if(productDescription){
        return (
                <div>
                <Breadcrumb data={category} />
                <WhiteWrapper>
                    <div className="prodDetail">
                        <div className="productInfo">
                            <div className="imgContainer"><img className="image" src={productDescription.picture} alt="" /></div>
                            <h1 className="title">{productDescription.title}</h1>
                            <p className="conditions"><span>{productDescription.condition === 'new' ? 'Nuevo' : 'Usado'}</span> | <span>{productDescription.sold_quantity} Vendidos</span></p>
                            <p className="price">$ {productDescription.price.amount}</p>
                            <button className="purchaseBtn">Comprar</button>
                        </div>
                        <div className="productDesc">
                            <div className="imgContainer"><img className="image" src={productDescription.picture} alt="" /></div>
                            <div>
                                <h2 className="descriptionTitle">Descripción del producto</h2>
                                <p className="descriptionText">{productDescription ? productDescription.description : null}</p>
                            </div>
                        </div>
                    </div>
                </WhiteWrapper>
                </div>
        )
    } else {
        return null;
    }
}

export default ProdDetail;