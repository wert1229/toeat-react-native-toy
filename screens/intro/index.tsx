import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CategoryActions } from '@/stores/actionCreators';
import IntroScreen from './IntroScreen';

interface Props {
    navigation: any
}

const mapStateToProps = (state) => ({
    categoryList: state.category.get('categoryList')
});

class IntroScreenContainer extends Component<Props> {

    _loadComplete = () => {
        this.props.navigation.replace('TabNavigator')
    }

    componentDidMount() {
        
        setTimeout(() => {
            this._loadComplete();
        },2000);
    }

    render(){
        const {  } = this;
        
        return (
            <IntroScreen />
        );
    }
}


export default connect(mapStateToProps)(IntroScreenContainer);
