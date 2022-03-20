import React, {Component} from 'react';

import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { fecthCollectionsStart } from '../../redux/shop/shop.actions';
import {selectIsCollectionFetching, selectIsCollectionLoaded} from '../../redux/shop/shop.selectors';


// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    

    componentDidMount(){
        
        const {fetchCollectionStart} = this.props;
        //Asynchronous Redux-Thunk method
        fetchCollectionStart();

        //This is an option using the collectionRef but promise based (This method has been applied with Redux-Thunk)
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     console.log(collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // });
        
        // Fetching the firesotre of our databse
        // fetch('https://firestore.googleapis.com/v1/projects/foxy-db-87eba/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections)); //Here we should deal with the response and load it as the collectionMap



        // This uses the observable pattern
        // collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     console.log(collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // })
    }

    render(){
        const {match} = this.props;
        
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
                <Route path={`${match.path}/:collection_id`} component={CollectionPageContainer} />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionStart: () => dispatch(fecthCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);

