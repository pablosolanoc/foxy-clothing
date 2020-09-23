import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({ collection, match, location, history}) => {

    console.log("PSSSS");
    console.log(match);
    console.log(location);
    console.log(history);
    const {title, items} = collection;

    return(
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    );
    
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collection_id)(state)
})

export default connect(mapStateToProps)(CollectionPage);