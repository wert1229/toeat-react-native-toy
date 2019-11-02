import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import InfoScreen from './InfoScreen';

interface Props {
    
}

const mapStateToProps = (state) => ({
    categoryList: state.category.get('categoryList')
});

class InfoScreenContainer extends Component<Props> {

    _categoryClick = () => {
        
    }

    render(){
        const {  } = this.props;
        const {  } = this;

        return (
            <InfoScreen />
        );
    }
}

export default connect(mapStateToProps)(InfoScreenContainer);