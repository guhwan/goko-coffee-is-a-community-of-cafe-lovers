import React, { Component } from 'react';
import Search from '../containers/Search';
import SearchContext from '../contexts/SearchContext';
import { withPage } from '../contexts/PageContext';

class SearchPage extends Component {
  componentDidMount() {
    // 페이지 Context의 search 상태를 true로 바꾼다.
    this.props.handlePageOpen('search');
    // 페이지가 렌더링 될때마다 스크롤을 맨 위로 올린다.
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    // 페이지 Context의 search 상태를 false로 바꾼다.
    this.props.handlePageClose('search');
  }

  render() {
    const { location } = this.props;
    const params = new URLSearchParams(decodeURI(location.search));
    const keyword = params.get('keyword');
    const page = parseInt(params.get('page'));
    return (
      <React.Fragment>
        <SearchContext.Provider value={keyword}>
          <Search key={[keyword, page]} page={page} keyword={keyword} />
        </SearchContext.Provider>
      </React.Fragment>
    );
  }
}

export default withPage(SearchPage);
