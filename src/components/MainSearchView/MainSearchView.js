import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './MainSearchView.module.scss';
import classNames from 'classnames/bind';
import { withPage } from '../../contexts/PageContext';

const cx = classNames.bind(styles);

class MainSearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      search: false,
    };
  }

  // search가 true로 바뀌면서 rendering 되고난 뒤에 search 상태가 true가 유지되기 때문에 이를 억지로 다시 false로 바꿔준다.
  // 이렇게 해야 검색창이 없어지지 않고 유지된다.
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.search) {
      this.setState({
        search: false,
        value: '',
      });
    }
  };

  handleInput(e) {
    this.setState({
      value: e.target.value,
    });
  }

  async handleButton() {
    if (!this.state.value) {
      alert('검색어를 입력해 주십시오');
    } else {
      this.setState({
        search: true,
      });
    }
  }

  render() {
    const { main } = this.props;
    if (this.state.search) {
      return <Redirect to={`/search?keyword=${this.state.value}&page=1`} />;
    }

    return (
      <React.Fragment>
        {main ? (
          <form className={cx('mainSearch')}>
            <fieldset>
              <legend>맛집검색</legend>
              <span className={cx('magnifyIcon')} />
              <input
                type="text"
                value={this.state.value}
                name="searchInput"
                placeholder="지역, 카페 또는 메뉴"
                onChange={e => this.handleInput(e)}
              />
              <button onClick={() => this.handleButton()}>검색</button>
            </fieldset>
          </form>
        ) : (
          <form className={cx('searchBox')}>
            <fieldset>
              <legend>맛집검색</legend>
              <span className={cx('searchIcon')} />
              <input
                type="text"
                value={this.state.value}
                name="searchInput"
                placeholder="지역, 카페 또는 메뉴"
                onChange={e => this.handleInput(e)}
              />
              <button
                className={cx('searchBtn')}
                onClick={() => this.handleButton()}
              >
                검색
              </button>
            </fieldset>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default withPage(MainSearchView);
