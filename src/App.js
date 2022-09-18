import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import PostDetailPage from './pages/PostDetailPage';
import Layout from './components/Layout';
import { UserProvider } from './contexts/UserContext';
import PageProvider from './contexts/PageContext';
import WritingReviewPage from './pages/WritingReviewPage';
import EatDealPage from './pages/EatDealPage';
import EatDealDetailPage from './pages/EatDealDetailPage';
import { WannagoProvider } from './contexts/WannagoContext';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <PageProvider>
            <WannagoProvider>
              <Layout>
                <div className="App">
                  <Switch>
                    <Route
                      path="/eatdeals/:restaurant"
                      component={EatDealDetailPage}
                    />
                    <Route path="/eatdeals/" component={EatDealPage} />
                    <Route
                      path="/restaurantsReview/:rReviewKeyword"
                      component={WritingReviewPage}
                    />
                    <Route path="/search" component={SearchPage} />
                    <Route
                      path="/restaurant/:rKeyword"
                      component={PostDetailPage}
                    />
                    {/*루트페이지는 항상 맨 아래 위치 */}
                    <Route path="/" component={MainPage} />
                  </Switch>
                </div>
              </Layout>
            </WannagoProvider>
          </PageProvider>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
